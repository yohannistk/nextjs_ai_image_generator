"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const ProModal = () => {
  const { isOpen, setOpen } = useProModal();
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/payment");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy More Credits</DialogTitle>
          <DialogDescription className="mt-16">
            Looks like you've reached your image generation limit! To continue
            creating stunning images, consider purchasing more credits. Happy
            creating!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handlePayment} type="submit">
            {loading ? "Loading..." : "Pay With Chapa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
