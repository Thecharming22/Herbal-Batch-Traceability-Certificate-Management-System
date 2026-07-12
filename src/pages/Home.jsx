import Hero from "../components/Hero";
import About from "./About";
import Certifications from "../components/Certifications";
import ProductShowcase from "../components/ProductShowcase";
import AIInsights from "../components/AIInsights";
import { Navigate } from "react-router-dom";

function Home() {

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Hero />

      <About />

      <Certifications />

      <ProductShowcase />

      <AIInsights />
    </>
  );
}

export default Home;