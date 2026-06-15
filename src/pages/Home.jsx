import Hero from "../components/Hero";
import Card from "../components/Card";
import About from "./About";
import Certifications from "../components/Certifications"; // ✅ import
import ProductShowcase from "../components/ProductShowcase";
function Home() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* ABOUT SECTION */}
      <About />

      {/* CERTIFICATIONS */}
      <Certifications />   {/* ✅ use component */}
       <ProductShowcase />   {/* ✅ showcase section */}
    </>
  );
}

export default Home;
