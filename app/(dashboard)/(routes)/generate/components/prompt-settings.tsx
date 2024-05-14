"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { avilableSizes } from "@/constants";
import { TPromptSettings } from "@/types";
import { SlidersHorizontal } from "lucide-react";
import React from "react";

interface Props {
  promptSettings: TPromptSettings;
  setPromptSettings: React.Dispatch<React.SetStateAction<TPromptSettings>>;
}

const PromptSettings = (props: Props) => {
  const {
    setPromptSettings,
    promptSettings: { height, negative_prompt, num_inference_steps, width },
  } = props;

  const handleChange = (field: string, newValue: string | number) => {
    setPromptSettings((prevValue) => ({
      ...prevValue,
      [field]: newValue,
    }));
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <SlidersHorizontal />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex px-3 py-6 flex-col">
        <SheetHeader>
          <SheetTitle>Edit prompt</SheetTitle>
          <SheetDescription>Make changes to your prompt here.</SheetDescription>
        </SheetHeader>
        <div>
          <Label className="mb-3 inline-block">Negative</Label>
          <Textarea
            value={negative_prompt}
            onChange={(e) => handleChange("negative_prompt", e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-3 inline-block">Height</Label>
          <Select
            value={height.toString()}
            onValueChange={(value) => handleChange("height", parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={height.toString()} />
            </SelectTrigger>
            <SelectContent>
              {avilableSizes.map((size) => {
                return (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-3 inline-block">Width</Label>
          <Select
            value={width.toString()}
            onValueChange={(value) => handleChange("width", parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={width.toString()} />
            </SelectTrigger>
            <SelectContent>
              {avilableSizes.map((size) => {
                return (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-3 inline-block">Number of steps</Label>
          <Input
            type="number"
            min={1}
            max={500}
            value={num_inference_steps}
            onChange={(e) =>
              handleChange("num_inference_steps", parseInt(e.target.value))
            }
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PromptSettings;
