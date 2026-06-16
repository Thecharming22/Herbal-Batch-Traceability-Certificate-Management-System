import smartFarming from "../assets/smart-farming.png";

export default function AIInsights() {
  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-10 overflow-hidden">
      {/* Background Video */}
      <video
        src="/ai.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto flex flex-row items-center gap-4 sm:gap-16 text-white">

        {/* IMAGE */}
        <div className="w-[55%]">
          <img
            src={smartFarming}
            alt="AI Dashboard"
            className="w-full rounded-xl shadow-2xl transform transition-all duration-500
           hover:scale-105 hover:-translate-y-2
           active:scale-105 active:-translate-y-2
           animate-[float_3s_ease-in-out_infinite]"
          />
        </div>

        {/* TEXT */}
        <div className="w-[45%] text-left">
          <h2 className="text-lg sm:text-5xl font-extrabold mb-3 sm:mb-5 text-green-800 animate-bounce">
            AI Yield Prediction & Insights
          </h2>

          <p className="text-[11px] sm:text-xl leading-relaxed">
            Our AI forecasts herbal yields with precision, helping plan
            harvests and ensure consistent quality. By analyzing field
            data and lab results, the system provides predictive insights
            that guide sustainable farming practices and ensure
            traceable, eco-friendly production.
          </p>
        </div>

      </div>
    </section>
  );
}