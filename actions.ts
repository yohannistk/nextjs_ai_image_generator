"use server";
import os from "os";

export const serverFunction = async () => {
  await new Promise((res) => {
    setTimeout(() => {
      res("");
    }, 4000);
  });
  return os.tmpdir();
};
