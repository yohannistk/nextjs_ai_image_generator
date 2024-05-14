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
      <div className="absolute invisible group-hover:visible transition-colors inset-0 bg-gray-950/40"></div>
    </div>
  );
};

export default ImageCard;
