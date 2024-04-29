"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, SlidersHorizontal } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { Image } from "@prisma/client";
import { default as NextImage } from "next/image";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
const GenerateImage = () => {
  const router = useRouter();
  const { setOpen } = useProModal();
  const promptRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState(false);
  const handleGenerateImage = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const prompt = promptRef.current?.value;
    if (!prompt) {
      toast.error("Promot is missing");
      return;
    }
    setImage(null);
    setLoading(true);
    try {
      const res = await axios.post("/api/generate", {
        prompt,
      });
      console.log(res.data.image);
      setImage(res.data.image);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status == 403) {
          // toast.error(e.response?.data.message);
          setOpen(true);
        } else {
          toast.error("Something went wroung");
        }
      }
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  return (
    <>
      <div className="flex gap-4">
        <form className="flex gap-3 flex-1" onSubmit={handleGenerateImage}>
          <Input
            ref={promptRef}
            placeholder="Want to see how Image Creator works? Select Surprise Me, then Create"
            className="resize-none"
          />
          <Button>
            <Pencil size={17} className="mr-2" />
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>
        <div>
          <Button size={"icon"} variant={"outline"}>
            <SlidersHorizontal />
          </Button>
        </div>
      </div>
      <div>
        {image ? (
          <div className="flex flex-col items-center w-full p-10">
            <NextImage
              className="rounded-md"
              alt={image.prompt}
              src={image.imageUrl}
              height={350}
              width={350}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GenerateImage;
