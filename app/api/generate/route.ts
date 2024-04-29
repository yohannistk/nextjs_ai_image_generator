import Replicate from 'replicate';
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from 'next/cache';

interface RequestBody {
  prompt: string;
}

const replicate = new Replicate();

export async function POST(request: Request) {
  const { prompt }: RequestBody = await request.json();
  const user = await currentUser();
  if (!user?.id) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!prompt) {
    return Response.json({ message: "Prompt is missing" }, { status: 400 });
  }

  try {
    const userLimit = await prisma.userLimit.findUnique({
      where : {userId : user?.id}
    })
  
    if (userLimit!.userUsage <= 0) {
      return Response.json({ message : "Looks like you've reached your image generation limit!" }, { status: 403 });
    }
  
    await prisma.userLimit.update({
      where: { id: userLimit?.id },
      data: { userUsage: { decrement: 1 } }
    })
    const input = {
        width: 768,
        height: 768,
        prompt : "An astronaut riding a rainbow unicorn, cinematic, dramatic",
        refine: "expert_ensemble_refiner",
        apply_watermark: false,
        num_inference_steps: 25
    };
  
    // const output = await replicate.run("stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b", { input }) as string[];
  
      const image = await prisma.image.create({
        data: {
          imageUrl : "https://replicate.delivery/pbxt/jrBharImwEYKHdzJV3MvA3qTroZ6nXpC8k1TRiZSA8YVfnXJA/out-0.png" ,
          prompt,
          userId: user.id,
        },
      }); 
      revalidatePath('/', "layout")
      return Response.json({ image }, { status: 200 });
  }
  catch(e) {
    return Response.json({ message : "Something went wroung" }, { status: 500 });

  }
}
