import aboutImage from "../assets/about.png";

function About() {
  return (
    <section
      id="about"
      className="relative py-12 sm:py-20 px-4 sm:px-10 bg-gradient-to-b from-green-800 via-green-700 to-black text-white overflow-hidden"
    >
      {/* sparkle overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,215,0,0.15),transparent_40%)] animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto flex flex-row items-center gap-4 sm:gap-16">
        
        {/* IMAGE */}
        <div className="w-[55%]">
        <img
  src={aboutImage}
  alt="About Herbal Farming"
  className="w-full rounded-xl shadow-2xl border border-green-900 
             hover:scale-105 active:scale-105 
             transition duration-500 animate-[float_3s_ease-in-out_infinite]"
/>
        </div>

        {/* TEXT */}
        <div className="w-[45%] animate-slideUp text-left">
          <h2 className="text-lg sm:text-5xl font-extrabold mb-3 sm:mb-5 text-green-950 drop-shadow-lg animate-bounce">
            About Us
          </h2>

          <p className="text-[11px] sm:text-lg leading-relaxed text-green-100 animate-fadeIn">
            We cultivate aromatic plants like Rosemary and Chamomile in
            Uttarakhand’s terrace farms. Through steam distillation, we
            produce pure essential oils that are certified, traceable,
            and eco-friendly.
          </p>

          <p className="mt-2 sm:mt-4 text-[11px] sm:text-lg text-green-200 animate-fadeIn delay-300">
            Our system ensures full batch traceability, laboratory
            verification, and sustainable harvesting practices that
            protect the Himalayan ecosystem while delivering premium
            quality oils.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;