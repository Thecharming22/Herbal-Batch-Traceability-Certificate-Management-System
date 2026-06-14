import aboutImage from "../assets/about.png";

function About() {
  return (
    <section
      id="about"
      className="relative py-55 px-30 bg-gradient-to-b from-green-950 via-green-900 to-black text-white overflow-hidden"
    >
      {/* sparkle overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,215,0,0.15),transparent_40%)] animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* IMAGE */}
        <div className="flex-[1.3]">
          <img
            src={aboutImage}
            alt="About Herbal Farming"
            className="w-full max-w-[850px] rounded-xl shadow-2xl border border-green-900 hover:scale-105 transition duration-500"
          />
        </div>

        {/* TEXT */}
        <div className="flex-1 animate-slideUp">
          <h2 className="text-5xl font-bold mb-5 text-green-300 drop-shadow-lg animate-bounce">
            About Us
          </h2>

          <p className="text-lg leading-relaxed text-green-100 animate-fadeIn">
            We cultivate aromatic plants like Rosemary and Chamomile in Uttarakhand’s terrace farms.
            Through steam distillation, we produce pure essential oils that are certified, traceable,
            and eco-friendly.
          </p>

          <p className="mt-4 text-green-200 text-lg animate-fadeIn delay-300">
  Our system ensures full batch traceability, laboratory verification, and sustainable harvesting
  practices that protect the Himalayan ecosystem while delivering premium quality oils.
</p>

        </div>
      </div>
    </section>
  );
}

export default About;
