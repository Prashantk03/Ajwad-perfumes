"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?limit=3");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-black text-white py-20 text-center">
        Loading best sellers...
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold">Best Sellers</h2>
          <p className="text-gray-400 mt-3">Our most loved fragrances</p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300"
            >
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-medium">{product.title}</h3>

                <p className="text-gray-400 mt-1">
                  {product.variants?.[0]?.price
                    ? `₹${product.variants[0].price}`
                    : "Price not available"}
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="block text-center mt-4 w-full border border-white py-2 rounded-lg hover:bg-white hover:text-black transition"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
