import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface Props {
  image: ImageType;
}
const ImageCard = ({ image }: Props) => {
  return (
    <div className="relative group cursor-pointer">
      <Image src={image.imageUrl} alt={image.prompt} width={300} height={300} />
      <div className="absolute invisible group-hover:visible  inset-0 bg-gray-950/40"></div>
      <div className="absolute invisible group-hover:visible top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="text-sm text-white p-5 text-center overflow-hidden text-ellipsis max-w-[calc(100% - 20px)]">
          {image.prompt}
        </span>
      </div>
    </div>
  );
};

export default ImageCard;
