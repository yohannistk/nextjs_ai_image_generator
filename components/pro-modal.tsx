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

import axios from "axios";
import toast from "react-hot-toast";

const ProModal = () => {
  const { isOpen, setOpen } = useProModal();
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/payment");
      const paymentUrl = res.data["paymentUrl"];
      window.location.assign(paymentUrl);
    } catch (e) {
      toast.error("Something went wrong");
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
            Looks like you have reached your image generation limit! To continue
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
