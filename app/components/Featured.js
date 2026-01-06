const collections = [
  {
    title: "Oud Collection",
    description: "Deep, rich and royal oud fragrances",
  },
  {
    title: "Attar Collection",
    description: "Pure traditional attars with modern elegance",
  },
  {
    title: "Premium Blends",
    description: "Crafted blends for lasting impressions",
  },
];

export default function Featured() {
  return (
    <section className="py-20 bg-white text-black px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 text-center hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.description}
              </p>

              <button className="text-sm font-semibold underline">
                View Collection
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
