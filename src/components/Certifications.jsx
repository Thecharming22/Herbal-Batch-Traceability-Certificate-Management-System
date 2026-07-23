import React from "react";

export default function Certifications() {
  return (
<section className="relative h-[400px] sm:h-[555px] md:h-[655px] lg:h-[755px] w-full overflow-hidden">

  {/* BACKGROUND VIDEO */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source src="/lab-testing.mp4" type="video/mp4" />
  </video>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-b from-green-950/30 via-black/10 to-green-900/30 flex flex-col items-center justify-center text-center px-6">

    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-green-950 animate-bounce">
      Certifications
    </h2>

    <p className="text-green-100 max-w-2xl text-sm md:text-base lg:text-lg">
      Every batch is tested, verified, and certified under strict quality standards
      ensuring purity, safety, and transparency from farm to final product.
    </p>

    <p className="text-green-100 max-w-2xl text-sm md:text-base lg:text-lg mt-4">
      AYUSH certification from India’s Ministry of AYUSH ensures herbal oils meet
      strict purity and authenticity standards, serving as a trusted seal of quality.
    </p>

  </div>
</section>
  );
}