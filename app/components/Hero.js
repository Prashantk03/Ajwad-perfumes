export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-black text-white px-6">
      <div className="max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-6">
          Experience the Essence of Luxury
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Premium oud & attar fragrances crafted for timeless elegance.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
            Shop Now
          </button>

          <button className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition">
            Explore Collections
          </button>
        </div>
      </div>
    </section>
  );
}
