import { useNavigate } from "react-router-dom";
import heroImage from "../assets/herbal-bg.jpg";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative text-center">

      {/* Hero Image */}
      <img
        src={heroImage}
        alt="Herbal"
        className="w-full h-[400px] sm:h-[600px] lg:h-[915px] object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-4 sm:px-6">
        <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 max-w-xl sm:max-w-3xl lg:max-w-5xl">
          <span className="shine-text">
            Herbal Batch Traceability &
          </span>
          <br />
          <span className="shine-text">
            Certificate Management System
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-gray-200 max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto hero-text">
          Ensuring transparency, quality assurance and complete
          traceability for essential oil production.
        </p>

        {/* ✅ Get Started button → Login page */}
        <button
          onClick={() => navigate("/login")}
          className="mt-6 sm:mt-8 bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-green-800 transition duration-300 hero-button"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Hero;
