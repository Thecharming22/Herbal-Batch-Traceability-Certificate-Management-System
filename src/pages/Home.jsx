import Hero from "../components/Hero";
import Card from "../components/Card";
import About from "./About";
import Certifications from "../components/Certifications";
import ProductShowcase from "../components/ProductShowcase";
import AIInsights from "../components/AIInsights";   // ✅ add this import

function Home() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* ABOUT SECTION */}
      <About />

      {/* CERTIFICATIONS */}
      <Certifications />

      {/* PRODUCT SHOWCASE */}
      <ProductShowcase />

      {/* AI SECTION */}
      <AIInsights />

      {/* Other homepage sections */}
    </>
  );
}

export default Home;
