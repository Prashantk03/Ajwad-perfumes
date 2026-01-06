import { getUserFromToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const user = await getUserFromToken();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json();

  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
    });
  }

  for (const item of items) {
    const existing = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        variantId: item.variantId,
      },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + item.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          ...item,
        },
      });
    }
  }

  return Response.json({ success: true });
}
