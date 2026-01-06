import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";
import { success } from "zod";

export async function PATCH(req, context) {
  const user = await getUserFromToken(req);
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ FIX: await params
  const { id } = await context.params;

  if (!id) {
    return Response.json({ error: "Item id missing" }, { status: 400 });
  }

  const { action } = await req.json();

  const item = await prisma.cartItem.findUnique({
    where: { id },
  });

  // Increase
  if (action === "increase") {
    await prisma.cartItem.update({
      where: { id },
      data: { quantity: item.quantity + 1 },
    });
  }

  // Decrease
  if (action === "decrease") {
    if (item.quantity <= 1){
      await prisma.cartItem.delete({ where: { id } });
    } else {
      await prisma.cartItem.update({
        where: { id },
        data: { quantity: item.quantity - 1 },
      });
    }
  }

  return Response.json({ success: true });
}

export async function DELETE(req, context) {
  const user = await getUserFromToken(req);
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ FIX: await params
  const { id } = await context.params;

  if (!id) {
    return Response.json({ error: "Item id missing" }, { status: 400 });
  }

  await prisma.cartItem.delete({
    where: { id },
  });

  return Response.json({ success: true });
}
