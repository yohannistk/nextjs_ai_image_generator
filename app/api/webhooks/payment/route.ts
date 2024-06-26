import { MAXIMUM_GENERATION_LIMIT } from "@/constants";
import prisma from "@/lib/db";
import { env } from "@/lib/env";
import axios from "axios";
import crypto from "crypto";

export async function POST(request: Request) {
  console.log("REQUEST CAME");
  try {
    const body = await request.json();
    const hash = crypto
      .createHmac("sha256", env.CHAPA_WEBHOOK_SECRET!)
      .update(JSON.stringify(body))
      .digest("hex");

    if (hash == request.headers.get("x-chapa-signature")) {
      // Retrieve the request's body
      const event = body;
      const { tx_ref, status } = event;
      if (status == "success" && tx_ref) {
        // hit the verify endpoint to make sure a transaction with the given
        // tx_ref was successful
        const response = await axios.get(
          `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,

          {
            headers: {
              Authorization: "Bearer " + env.CHAPA_KEY,
            },
          }
        );
        if (response.status == 200) {
          // if successful find the order
          if (response.data["status"] == "success") {
            // let tx_ref = response.data["data"]["tx_ref"];
            // console.log(tx_ref);
            let email = response.data["data"]["email"];
            await prisma.userLimit.update({
              where: { email },
              data: { userUsage: MAXIMUM_GENERATION_LIMIT },
            });
            return new Response("", { status: 200 });
          }
        }
      } else {
        return Response.json(
          { message: "Something went wrong" },
          { status: 400 }
        );
      }
    } else {
      return Response.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    }
  } catch (e) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
