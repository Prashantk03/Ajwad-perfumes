"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

export default function ProductActions({ product }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (product?.variants?.length) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product?.variants?.length) {
    return <p className="text-red-400">Product unavailable</p>;
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      id: `${product.id}-${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      image: product.images?.[0] || "/placeholder.png",
      price: Number(selectedVariant.price),
      size: `${selectedVariant.sizeMl} ml`,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  return (
    <>
      {/* Variants */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">Available Sizes</p>
        <div className="flex gap-3">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 border rounded-lg text-sm ${
                selectedVariant?.id === variant.id
                  ? "border-white"
                  : "border-gray-600"
              }`}
            >
              {variant.sizeMl} ml
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full md:w-auto px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Add to Cart
      </button>
    </>
  );
}
