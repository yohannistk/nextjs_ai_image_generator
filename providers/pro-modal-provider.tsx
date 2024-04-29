"use client";

import ProModal from "@/components/pro-modal";
import React, { useEffect, useState } from "react";

const ProModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      <ProModal />
    </>
  );
};

export default ProModalProvider;
