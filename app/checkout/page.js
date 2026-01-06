"use client";

import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-8 pt-20 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT: DELIVERY DETAILS */}
        <div>
          <h1 className="text-2xl font-semibold mb-6">Delivery Details</h1>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-gray-700 focus:outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-gray-700 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Address Line"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-gray-700 focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                className="px-4 py-3 rounded-lg bg-zinc-900 border border-gray-700 focus:outline-none"
              />
              <input
                type="text"
                placeholder="State"
                className="px-4 py-3 rounded-lg bg-zinc-900 border border-gray-700 focus:outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Pincode"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          <div className="bg-zinc-900 rounded-xl p-6 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-gray-700 pb-4 last:border-none last:pb-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">
                    {item.size} ml × {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition">
              Place Order
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}

