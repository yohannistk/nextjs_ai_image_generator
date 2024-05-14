import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  image: ImageType;
}
const ImageCard = ({ image }: Props) => {
  return (
    <div
      // href={"#"}
      className="relative max-w-[230px] group flex h-52 items-end overflow-hidden shadow-lg rounded-xl bg-gray-100 cursor-pointer"
    >
      <Image
        src={image.imageUrl}
        alt={image.prompt}
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{
          objectFit: "cover",
          backgroundPosition: "center", // cover, contain, none
        }}
      />
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
