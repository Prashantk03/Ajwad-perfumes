import ProductClient from "./ProductClient";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3000/api/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div className="text-white">Product not found</div>;
  }

  const product = await res.json();

  return <ProductClient product={product} />;
}

