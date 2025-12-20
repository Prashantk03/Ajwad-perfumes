import { prisma } from "./lib/prisma.js";

async function test() {
  try {
    const result = await prisma.product.findMany();
    console.log(result);
  } catch (e) {
    console.error("PRISMA ERROR:", e);
  }
}

test();
