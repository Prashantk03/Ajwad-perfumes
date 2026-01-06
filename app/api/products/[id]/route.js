import prisma from "@/lib/prisma";
import { updateProductSchema } from "@/lib/validators/product.schema";
import { ZodError } from "zod";

export async function GET(_req, { params }) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    });

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Server error while fetching product" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validatedData = updateProductSchema.parse(body);

    const product = await prisma.product.update({
      where: { id },
      data: validatedData,
    });

    return Response.json(product, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json({ errors: err.errors }, { status: 400 });
    }
    console.error("PUT ERROR:", err);
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;

    await prisma.productVariant.deleteMany({
      where: { productId: id },
    });

    await prisma.product.delete({
      where: { id },
    });

    return Response.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
