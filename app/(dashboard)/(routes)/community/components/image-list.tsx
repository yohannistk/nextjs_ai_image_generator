"use client";
import React from "react";
import { Image } from "@prisma/client";
import ImageCard from "./image-card";

interface Props {
  images: Image[];
}
const ImageList = ({ images }: Props) => {
  return (
    <div className="columns-2 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
      {images.map((image) => {
        return <ImageCard key={image.id} image={image} />;
      })}
    </div>
  );
};

export default ImageList;
