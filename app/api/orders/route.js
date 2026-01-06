import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req) {
  const user = await getUserFromToken(req);

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 1️⃣ Fetch cart with items
  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });

  if (!cart || cart.items.length === 0) {
    return Response.json(
      { error: "Cart is empty" },
      { status: 400 }
    );
  }

  // 2️⃣ Calculate total amount
  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 3️⃣ Create order
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount,
      shipping: {}, // placeholder for now
      items: {
        create: cart.items.map((item) => ({
          variantId: item.variantId,
          qty: item.quantity,
          priceEach: item.price,
        })),
      },
    },
  });

  // 4️⃣ Clear cart
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return Response.json(
    {
      success: true,
      orderId: order.id,
    },
    { status: 201 }
  );
}