import prisma from "@/lib/db";
import axios from "axios";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);

    const hash = crypto
      .createHmac("sha256", process.env.CHAPA_WEBHOOK_SECRET!)
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
              Authorization: "Bearer " + process.env.CHAPA_KEY,
            },
          }
        );
        if (response.status == 200) {
          // if successful find the order
          if (response.data["status"] == "success") {
            let tx_ref = response.data["data"]["tx_ref"];
            console.log(tx_ref);
            console.log(body);
            return new Response("", { status: 200 });
          }
        }
      } else {
        console.log("HERE");

        return Response.json(
          { message: "Something went wrong" },
          { status: 400 }
        );
      }
    } else {
      console.log("HERE", request.headers.get("x-chapa-signature"));
      return Response.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    }
  } catch (e) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
