"use client";
import React from "react";
import { Image as ImageType } from "@prisma/client";
import ImageCard from "./image-card";
import Image from "next/image";

interface Props {
  images: ImageType[];
}
const ImageList = ({ images }: Props) => {
  return (
    <div className="grid gap-4 grid-cols-gallery">
      {images.map((image) => {
        return <ImageCard key={image.id} image={image} />;
      })}
    </div>
  );
};

export default ImageList;
