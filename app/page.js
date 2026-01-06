import Hero from "./components/Hero";
import Featured from "./components/Featured";
import BestSellers from "./components/BestSellers";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Featured />
      <BestSellers />
    </main>
  );
}

