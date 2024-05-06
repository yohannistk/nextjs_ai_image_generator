import { getURL } from "@/utils/helpers";
import { InitializeOptions } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { nanoid } from "nanoid";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user?.id) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  const txRef = nanoid();

  let chapaRequestData: InitializeOptions = {
    amount: "100",
    tx_ref: txRef,
    currency: "ETB",
    first_name: user.firstName || "",
    last_name: user.lastName || "",
    email: user.emailAddresses[0].emailAddress,
    callback_url: getURL("/generate"),
    return_url: getURL("/generate"),
    // customization : {
    //     title : "Upgrade Your Creativity",
    //     description : "Don't let limits hold you back—invest in your artistic journey today!"
    // }
  };

  try {
    const response = await axios.post(
      `https://api.chapa.co/v1/transaction/mobile-initialize`,
      chapaRequestData,
      {
        headers: {
          Authorization: "Bearer " + process.env.CHAPA_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // check if succesful
    if (response.data["status"] == "success") {
      return Response.json({
        message: "Order created successfully. Perform payment.",
        paymentUrl: response.data["data"]["checkout_url"],
      });
    } else {
      return Response.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
