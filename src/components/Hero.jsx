import heroImage from "../assets/herbal-bg.jpg";

function Hero() {
  return (
    <section className="relative text-center">

      {/* Hero Image */}
      <img
        src={heroImage}
        alt="Herbal"
        className="w-full h-[915px] object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-6">

<h1 className="hero-title text-5xl font-bold mb-6 max-w-5xl">

  <span className="shine-text">
    Herbal Batch Traceability &
  </span>

  <br />

  <span className="shine-text">
    Certificate Management System
  </span>

</h1>
<p className="text-lg text-gray-200 max-w-3xl mx-auto hero-text">
  Ensuring transparency, quality assurance and complete
  traceability for essential oil production.
</p>

<button className="mt-8 bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition duration-300 hero-button">
  Get Started
</button>

      </div>

    </section>
  );
}

export default Hero;