import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const brand = searchParams.get("brand") || "";
    const fragnanceFamily = searchParams.get("family") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
        brand: brand || undefined,
        fragranceFamily: fragnanceFamily || undefined,
      },
      include: { variants: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.product.count();

    return Response.json({
      page,
      limit,
      total,
      products,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
    try {
        const body = await request.json();

        const product = await prisma.product.create({
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                brand: body.brand,
                fragnanceFamily: body.fragnanceFamily,
                concentration: body.concentration,
                images: body.images,
                variants: {
                    create: body.variants,
                },
            },
            include : { variants: true },
        });

        return Response.json(product, { status: 201 });
    } catch (err) {
        console.error(err);
        return Response.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
