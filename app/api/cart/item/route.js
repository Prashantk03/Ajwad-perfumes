import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req) {
  const user = await getUserFromToken(req);
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const item = await req.json();

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  const existing = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      variantId: item.variantId,
    },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        ...item,
      },
    });
  }

  return Response.json({ success: true });
}
