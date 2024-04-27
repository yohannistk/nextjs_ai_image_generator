"use client";
import React from "react";
import { default as NextImage } from "next/image";
import { Image } from "@prisma/client";
import ImageCard from "./image-card";

interface Props {
  images: Image[];
}
const ImageList = ({ images }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
      {images.map((image) => {
        return <ImageCard image={image} />;
      })}
    </div>
  );
};

export default ImageList;
