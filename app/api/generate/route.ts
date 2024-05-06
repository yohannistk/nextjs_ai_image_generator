import Replicate from "replicate";
import prisma from "@/lib/db";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { HfInference } from "@huggingface/inference";
import { createClient } from "@/utils/supabase/server";
import { NextApiRequest } from "next";

interface RequestBody {
  prompt: string;
}

type InputType = {
  width: number;
  height: number;
  prompt: string;
  refine: string;
  apply_watermark: boolean;
  num_inference_steps: number;
};

const generateImageUsingHuggingFace = async (
  input: InputType,
  userId: string
) => {
  // const supabase = createClient();
  // const hf = new HfInference(process.env.HUGGINGFACE_ACCESS_TOKEN);
  // console.log(hf);
  // const imgDesc = await hf.textToImage({
  //   inputs: input.prompt,
  //   model: "stabilityai/stable-diffusion-2",
  //   parameters: {
  //     // negative_prompt: "blurry",
  //     height: input.width,
  //     width: input.width,
  //     num_inference_steps: input.num_inference_steps,
  //   },
  // });
  // console.log(imgDesc);
  // const { data, error } = await supabase.storage
  //   .from("images")
  //   .upload(`/${userId}`, imgDesc, {
  //     // cacheControl: "3600",
  //     upsert: true,
  //   });
  // console.log(error?.message);
  // // if (error) throw new Error("Unable to generate");
  // if (error) throw new Error("Unable to generate");
  // // const { data: imageUrl } = supabase.storage
  // //   .from("images")
  // //   .getPublicUrl(data.path);
  // return "imageUrl";
};
const generateImageUsingReplicate = async (
  input: InputType
): Promise<string[]> => {
  const replicate = new Replicate();
  const output = (await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    { input }
  )) as string[];
  return output;
};

type CustomNextApiRequest = NextApiRequest & Request;

export async function POST(request: CustomNextApiRequest) {
  const { prompt }: RequestBody = await request.json();
  const user = await currentUser();
  const auth = getAuth(request);
  const supabaseAccessToken = await auth.getToken({
    template: "supabase",
  });
  console.log(supabaseAccessToken);
  const supabase = createClient(supabaseAccessToken!);

  // console.log(auth);
  // supabase.auth.
  console.log(await supabase.from("Image").select("*"));
  // console.log(await auth.getToken());
  if (!user?.id) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  // if (!prompt) {
  //   return Response.json({ message: "Prompt is missing" }, { status: 400 });
  // }

  try {
    // const userLimit = await prisma.userLimit.findUnique({
    //   where: { userId: user?.id },
    // });

    // if (userLimit!.userUsage <= 0) {
    //   return Response.json(
    //     { message: "Looks like you've reached your image generation limit!" },
    //     { status: 403 }
    //   );
    // }

    const input: InputType = {
      width: 768,
      height: 768,
      prompt: "An astronaut riding a rainbow unicorn, cinematic, dramatic",
      refine: "expert_ensemble_refiner",
      apply_watermark: false,
      num_inference_steps: 25,
    };

    // const imageUrl = await generateImageUsingHuggingFace(input, user.id);
    // console.log(imageUrl);

    const image = await prisma.image.create({
      data: {
        imageUrl:
          "https://replicate.delivery/pbxt/jrBharImwEYKHdzJV3MvA3qTroZ6nXpC8k1TRiZSA8YVfnXJA/out-0.png",
        prompt,
        user_id: user.id,
      },
    });
    // await prisma.userLimit.update({
    //   where: { id: userLimit?.id },
    //   data: { userUsage: { decrement: 1 } },
    // });
    return Response.json({ image }, { status: 200 });
  } catch (e) {
    // console.log(e.message as any);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
