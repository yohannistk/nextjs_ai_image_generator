import prisma from "@/lib/db";
import { HfInference } from "@huggingface/inference";
import { createClient } from "@/utils/supabase/server";
import { NextApiRequest } from "next";
import { auth } from "@clerk/nextjs/server";
import { env } from "@/lib/env";
import { InputType } from "@/types";
import { inputSchema } from "@/zod-schemas";
interface RequestBody {
  input: InputType;
}

type CustomNextApiRequest = NextApiRequest & Request;

export async function POST(request: CustomNextApiRequest) {
  const { input }: RequestBody = await request.json();
  const { userId, getToken } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const supabaseAccessToken = await getToken({
    template: "supabase",
  });

  if (!userId || !supabaseAccessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  // refine: "expert_ensemble_refiner",
  // apply_watermark: false,
  const response = inputSchema.safeParse(input);
  if (!response.success) {
    const { errors } = response.error;
    return Response.json(
      { message: "Invalid request", errors },
      { status: 400 }
    );
  }
  const { height, num_inference_steps, prompt, width, negative_prompt } =
    response.data;
  try {
    const userLimit = await prisma.userLimit.findUnique({
      where: { user_id: userId },
    });

    if (userLimit!.userUsage <= 0) {
      return Response.json(
        { message: "Looks like you've reached your image generation limit!" },
        { status: 403 }
      );
    }
    const supabase = createClient(supabaseAccessToken);
    const hf = new HfInference(env.HUGGINGFACE_ACCESS_TOKEN);
    const imgDesc = await hf.textToImage({
      inputs: prompt,
      model: "stabilityai/stable-diffusion-2",
      parameters: {
        height,
        width: width,
        num_inference_steps: num_inference_steps,
        negative_prompt: negative_prompt,
      },
    });
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${userId}/${Date.now()}.jpg`, imgDesc, {
        cacheControl: "3600",
        upsert: true,
      });
    console.log(error);
    if (error) throw new Error("Unable to generate");
    const { data: imageData } = supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    const image = await prisma.image.create({
      data: {
        imageUrl: imageData.publicUrl,
        prompt,
        user_id: userId,
      },
    });
    await prisma.userLimit.update({
      where: { id: userLimit!.id },
      data: { userUsage: { decrement: 1 } },
    });
    return Response.json({ image }, { status: 200 });
  } catch (e: any) {
    console.log(e?.message);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
