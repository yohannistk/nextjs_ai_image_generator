import prisma from "@/lib/db";
import React from "react";
import ImageList from "@/components/image-list";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const getImages = async (userId: string) => {
  const images = await prisma.image.findMany({
    where: {
      user_id: userId,
    },
  });
  return images;
};

const Library = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const images = await getImages(userId);
  return (
    <div className="max-w-6xl w-full mx-auto">
      <ImageList images={images} />
    </div>
  );
};

export default Library;
