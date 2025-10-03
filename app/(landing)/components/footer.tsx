import Link from "next/link";
import React from "react";

const Fotter = () => {
  return (
    <div className="border-t bg-gray-50">
      <div className="max-w-2xl mx-auto text-gray-900 py-10">
        <div className="text-center">
          <h3 className="text-3xl mb-3 font-semibold"> Download Our App </h3>
          <p>Unleashing Creativity: AI-Powered Image Generator Platform</p>
          <div className="flex flex-col gap-2 items-center md:flex-row justify-center  my-10">
            <Link
              href={""}
              className="flex items-center border border-muted-foreground rounded-lg px-4 py-2 w-56 mx-2"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-sm md:text-base"> Google Play Store </p>
              </div>
            </Link>
            <Link
              href={""}
              className="flex items-center border border-muted-foreground rounded-lg px-4 py-2 w-56  mx-2"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-sm md:text-base"> Apple Store </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
        <p className="order-2 md:order-1 mt-8 md:mt-0 text-gray-700">
          &copy; HabeshaCanvas, {new Date().getFullYear()}.
        </p>
          <div className="order-1 md:order-2">
            <Link href={"#"} className="px-2 text-gray-700">
              About us
            </Link>
            <Link href={"#"} className="px-2 border-l text-gray-700">
              Contact us
            </Link>
            <Link href={"#"} className="px-2 border-l text-gray-700">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fotter;
