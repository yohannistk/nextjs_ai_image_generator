import prisma from "@/lib/db";

export async function GET(request: Request) {
  const images = await prisma.image.findMany();
  Response.json({ images });
}
