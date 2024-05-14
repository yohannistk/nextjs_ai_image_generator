import Link from "next/link";
import React from "react";

const Fotter = () => {
  return (
    <div className="bg-gray-800">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <h3 className="text-3xl mb-3"> Download our fitness app </h3>
          <p> Stay fit. All day, every day. </p>
          <div className="flex justify-center my-10">
            <Link
              href={""}
              className="flex items-center border rounded-lg px-4 py-2 w-56 mx-2"
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
              className="flex items-center border rounded-lg px-4 py-2 w-56  mx-2"
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
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            {" "}
            &copy; Pixel Pulse, 2024.{" "}
          </p>
          <div className="order-1 md:order-2">
            <Link href={"#"} className="px-2 text-muted-foreground">
              About us
            </Link>
            <Link href={"#"} className="px-2 border-l text-muted-foreground">
              Contact us
            </Link>
            <Link href={"#"} className="px-2 border-l text-muted-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fotter;
