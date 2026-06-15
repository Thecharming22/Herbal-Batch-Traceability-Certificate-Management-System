import React from "react";
import rosemaryImg from "../assets/rosemary.png";
import chamomileImg from "../assets/chamomile.png";
import leafBg from "../assets/leaf.jpg";   // ✅ background image import
import ayushLogo from "../assets/ayush.png"; // ✅ AYUSH logo import

export default function ProductShowcase() {
  return (
    <section 
      className="py-16 bg-white text-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${leafBg})` }}
    >
      <h2 
        className="text-5xl md:text-6xl font-extrabold mb-8 
                   text-green-900 relative inline-block 
                   animate-bounce"
      >
        <span className="relative z-10"> Essential Oils</span>
        <span 
          className="absolute inset-0 shine-text"
        >
          Essential Oils
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Rosemary Oil */}
        <div className="relative p-6 rounded-lg border-4 border-yellow-400 
                        shadow-[0_0_25px_rgba(255,215,0,0.9)] 
                        transition-transform duration-500 ease-in-out 
                        hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,1)]">
          
       
          {/* AYUSH Logo Overlay */}
<img 
  src={ayushLogo} 
  alt="AYUSH Certified" 
  className="absolute top-4 right-4 h-20 w-20 rounded-full 
             bg-white p-2 border-2 border-green-700 
             shadow-[0_0_25px_rgba(255,215,0,0.9)] 
             animate-glow"
/>


          <img src={rosemaryImg} alt="Rosemary Oil" className="w-full h-64 object-cover rounded mb-4" />
          <h3 className="text-xl font-semibold text-green-900">Rosemary Oil</h3>
          <p className="text-gray-600 mt-2">Steam distilled, pure, lab tested.</p>
          <button className="mt-4 bg-green-900 text-white px-4 py-2 rounded transition duration-300 hover:shadow-[0_0_18px_rgba(34,197,94,0.9)] hover:brightness-110 hero-button">
            View Certificate
          </button>
        </div>

        {/* Chamomile Oil */}
        <div className="relative p-6 rounded-lg border-4 border-yellow-400 
                        shadow-[0_0_25px_rgba(255,215,0,0.9)] 
                        transition-transform duration-500 ease-in-out 
                        hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,1)]">
          
         
         {/* AYUSH Logo Overlay */}
<img 
  src={ayushLogo} 
  alt="AYUSH Certified" 
  className="absolute top-4 right-4 h-20 w-20 rounded-full 
             bg-white p-2 border-2 border-green-700 
             shadow-[0_0_25px_rgba(255,215,0,0.9)] 
             animate-glow"
/>


          <img src={chamomileImg} alt="Chamomile Oil" className="w-full h-64 object-cover rounded mb-4" />
       <h3 className="text-xl font-semibold text-green-900">Chamomile Oil</h3>
          <p className="text-gray-600 mt-2">Gentle, calming, certified for purity.</p>
          <button className="mt-4 bg-green-900 text-white px-4 py-2 rounded transition duration-300 hover:shadow-[0_0_18px_rgba(34,197,94,0.9)] hover:brightness-110 hero-button">
            View Certificate
          </button>
        </div>
      </div>
    </section>
  );
}
