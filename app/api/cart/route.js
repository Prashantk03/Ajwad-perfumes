import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromToken();

  if (!user) {
    return Response.json({ cart: [] });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });

  // MUST return items WITH id
  return Response.json({ cart: cart?.items || [] });
}

