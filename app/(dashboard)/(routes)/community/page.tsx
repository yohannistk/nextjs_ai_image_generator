import prisma from "@/lib/db";
import Image from "next/image";
import React from "react";
import { default as NextImage } from "next/image";
import ImageList from "./components/image-list";
const getImages = async () => {
  const images = await prisma.image.findMany();
  return images;
};

const Community = async () => {
  const images = await getImages();
  return (
    <div className="max-w-6xl">
      <ImageList images={images} />
    </div>
  );
};

export default Community;
