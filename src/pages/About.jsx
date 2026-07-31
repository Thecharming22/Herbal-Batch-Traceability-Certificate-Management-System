import aboutImage from "../assets/about.png";

function About() {
  return (
    <section
      id="about"
      className="
        relative
        min-h-[calc(100vh-70px)]
        flex
        items-center
        py-10
        sm:py-16
        lg:py-20
        px-5
        sm:px-10
        bg-gradient-to-b
        from-green-800
        via-green-700
        to-black
        text-white
        overflow-hidden
      "
    >
      {/* Sparkle overlay */}
      <div
        className="
          absolute
          inset-0
          opacity-30
          bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,215,0,0.15),transparent_40%)]
          animate-pulse
        "
      ></div>

      <div
        className="
          relative
          w-full
          max-w-6xl
          mx-auto
          flex
          flex-col
          md:flex-row
          items-center
          justify-center
          gap-8
          md:gap-12
          lg:gap-20
        "
      >

{/* IMAGE */}
<div
  className="
    w-full
    md:w-[58%]
    flex
    justify-center
    flex-shrink-0
  "
>
  <img
    src={aboutImage}
    alt="About Herbal Farming"
    className="
      w-full
      max-w-[650px]
      rounded-2xl
      shadow-2xl
      border
      border-green-900
      hover:scale-105
      transition
      duration-500
      animate-[float_3s_ease-in-out_infinite]
    "
  />
</div>
       {/* TEXT */}
<div
  className="
    w-full
    md:w-[42%]
    max-w-xl
    text-center
    md:text-left
    animate-slideUp
  "
>
          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-extrabold
              mb-4
              lg:mb-6
              text-green-950
              drop-shadow-lg
            "
          >
            About Us
          </h2>

          <p
            className="
              text-sm
              sm:text-base
              lg:text-lg
              leading-7
              lg:leading-8
              text-green-100
              animate-fadeIn
            "
          >
            We cultivate aromatic plants like Rosemary and Chamomile in
            Uttarakhand’s terrace farms. Through steam distillation, we
            produce pure essential oils that are certified, traceable,
            and eco-friendly.
          </p>

          <p
            className="
              mt-4
              lg:mt-6
              text-sm
              sm:text-base
              lg:text-lg
              leading-7
              lg:leading-8
              text-green-200
              animate-fadeIn
              delay-300
            "
          >
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