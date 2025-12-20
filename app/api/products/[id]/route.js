import { prisma } from "@/lib/prisma";

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

    console.log("ID:", id);

    const product = await prisma.product.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        brand: body.brand,
        fragranceFamily: body.fragranceFamily,
        concentration: body.concentration,
        images: body.images,
      },
    });

    return Response.json(product, { status: 200 });
  } catch (err) {
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
