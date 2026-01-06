import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "./prisma";

export async function getUserFromToken() {
  try {
    const cookieStore = await cookies(); // ✅ await
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
}
