import prisma from "@/lib/db";
import React from "react";
import ImageList from "@/components/image-list";
const getImages = async () => {
  const images = await prisma.image.findMany();
  return images;
};

const Community = async () => {
  const images = await getImages();
  return (
    <div className="max-w-6xl w-full mx-auto p-4">
      <ImageList images={images} />
    </div>
  );
};

export default Community;
