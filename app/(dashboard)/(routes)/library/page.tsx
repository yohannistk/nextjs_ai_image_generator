import prisma from "@/lib/db";
import React from "react";
import ImageList from "@/components/image-list";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
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
    <div className="max-w-6xl w-full h-full mx-auto">
      {images.length == 0 ? (
        <div className="w-full flex items-center justify-center h-full">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="font-bold">No Images Yet</h2>
            <Link
              className={buttonVariants({
                className: "",
              })}
              href={"/generate"}
            >
              Start Generating{" "}
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl w-full mx-auto p-4">
          <ImageList images={images} />
        </div>
      )}
    </div>
  );
};

export default Library;
