"use client";

import ProductActions from "./ProductActions";

export default function ProductClient({ product }) {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-[420px] object-cover rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
          <p className="text-gray-400 mb-6">{product.description}</p>

          <p className="text-2xl font-bold mb-6">
            ₹{product.variants?.[0]?.price}
          </p>

          <ProductActions product={product} />
        </div>
      </div>
    </main>
  );
}
