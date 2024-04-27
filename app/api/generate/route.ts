import prisma from "@/lib/db";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface RequestBody {
  prompt: string;
}

const getRandomNumber = () => {
  return Math.floor(Math.random() * 4 + 1);
};

export async function POST(request: Request) {
  const { prompt }: RequestBody = await request.json();
  const user = await currentUser();

  if (!user?.id) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const imageNames = [
    "_7e73972e-6889-49da-8707-3abb8b2e3246",
    "_7eb345c5-f712-48f5-b187-0ba9d2fc7f0d",
    "_792e7545-ddc8-43e5-98a1-c97dda9128d0",
    "_8928137a-ec75-4e62-b770-e41ae06882e8",
    "_30254745-4d3a-4a8c-a1ff-9b5aa214f3e8",
  ];
  if (!prompt) {
    return Response.json({ message: "Prompt is missing" }, { status: 400 });
  }
  const imageUrl = `http://localhost:3000/images/${
    imageNames[getRandomNumber()]
  }.jpg`;
  const image = await prisma.image.create({
    data: {
      imageUrl,
      prompt,
      userId: user.id,
    },
  });
  return Response.json({ image }, { status: 200 });
}
