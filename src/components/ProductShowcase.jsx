import rosemaryImg from "../assets/rosemary.png";
import chamomileImg from "../assets/chamomile.png";
import leafBg from "../assets/leaf.jpg";
import ayushLogo from "../assets/ayush.png";
import React, { useState, useEffect } from "react";

export default function ProductShowcase() {
const [rosemaryBatch, setRosemaryBatch] = useState(null);
const [chamomileBatch, setChamomileBatch] = useState(null);
const [selectedCertificate, setSelectedCertificate] = useState(null);
const token =
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");
useEffect(() => {
 fetch("http://localhost:5000/api/batches/certificate/rosemary", {
  headers:{
    Authorization:`Bearer ${token}`
  }
})

fetch("http://localhost:5000/api/batches/certificate/chamomile", {
  headers:{
    Authorization:`Bearer ${token}`
  }
})
}, []);
  return (
  <>
    <section
      className="py-12 sm:py-16 bg-white text-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${leafBg})` }}
    >
      <h2
        className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-8
        text-green-900 relative inline-block animate-bounce"
      >
        <span className="relative z-10">Essential Oils</span>
        <span className="absolute inset-0 shine-text">
          Essential Oils
        </span>
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-8 max-w-5xl mx-auto">

        {/* Rosemary */}
        <div
          className="relative p-2 sm:p-6 rounded-lg border-4 border-yellow-400
          shadow-[0_0_25px_rgba(255,215,0,0.9)]
          transition-all duration-500
          hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,1)]"
        >
          <img
            src={ayushLogo}
            alt="AYUSH"
            className="absolute top-2 right-2 h-8 w-8 sm:h-20 sm:w-20 rounded-full
            bg-white p-1 sm:p-2 border-2 border-green-700"
          />

          <img
            src={rosemaryImg}
            alt="Rosemary"
            className="w-full h-28 sm:h-64 object-cover rounded mb-4"
          />

          <h3 className="text-sm sm:text-xl font-semibold text-green-900">
            Rosemary Oil
          </h3>

          <p className="text-xs sm:text-base text-gray-600 mt-2">
            Steam distilled, pure, lab tested.
          </p>

          <button
            onClick={() => {
              if (rosemaryBatch) {
                setSelectedCertificate(rosemaryBatch);
              } else {
                alert("No Rosemary certificate found.");
              }
            }}
            className="mt-4 bg-green-900 text-white px-4 py-2 rounded
            hover:bg-green-800 transition"
          >
            View Certificate
          </button>
        </div>

        {/* Chamomile */}
        <div
          className="relative p-2 sm:p-6 rounded-lg border-4 border-yellow-400
          shadow-[0_0_25px_rgba(255,215,0,0.9)]
          transition-all duration-500
          hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,1)]"
        >
          <img
            src={ayushLogo}
            alt="AYUSH"
            className="absolute top-2 right-2 h-8 w-8 sm:h-20 sm:w-20 rounded-full
            bg-white p-1 sm:p-2 border-2 border-green-700"
          />

          <img
            src={chamomileImg}
            alt="Chamomile"
            className="w-full h-28 sm:h-64 object-cover rounded mb-4"
          />

          <h3 className="text-sm sm:text-xl font-semibold text-green-900">
            Chamomile Oil
          </h3>

          <p className="text-xs sm:text-base text-gray-600 mt-2">
            Gentle, calming, certified for purity.
          </p>

          <button
            onClick={() => {
              if (chamomileBatch) {
                setSelectedCertificate(chamomileBatch);
              } else {
                alert("No Chamomile certificate found.");
              }
            }}
            className="mt-4 bg-green-900 text-white px-4 py-2 rounded
            hover:bg-green-800 transition"
          >
            View Certificate
          </button>
        </div>

      </div>
    </section>

    {/* ================= CERTIFICATE MODAL ================= */}

    {selectedCertificate && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">

        <div className="bg-[#08160f] w-[700px] max-w-[95%] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.4)] border-2 border-yellow-500 animate-fadeIn">

          {/* Header */}

          <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 px-8 py-6 flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 bg-clip-text text-transparent">
                🌿 Quality Certificate
              </h2>

              <p className="text-green-200 text-sm mt-1">
                Batch Traceability & Certificate Management
              </p>
            </div>

            <img
              src={ayushLogo}
              alt="AYUSH"
              className="w-16 h-16 bg-white rounded-full p-2"
            />

          </div>

          {/* Body */}

          <div className="p-8 text-white">

            <div className="grid grid-cols-2 gap-6">

              <div>
                <p className="text-yellow-400 font-semibold">
                  Batch ID
                </p>

                <p>{selectedCertificate.batchId}</p>
              </div>

              <div>
                <p className="text-yellow-400 font-semibold">
                  Plant Variety
                </p>

                <p>{selectedCertificate.plantVariety}</p>
              </div>

              <div>
                <p className="text-yellow-400 font-semibold">
                  Certificate File
                </p>

                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                  {selectedCertificate.certificateFileName}
                </span>
              </div>

              <div>
                <p className="text-yellow-400 font-semibold">
                  Status
                </p>

                <span
                  className={`px-3 py-1 rounded-full font-bold ${
                    selectedCertificate.status === "Pending"
                      ? "bg-yellow-500 text-black"
                      : "bg-green-600"
                  }`}
                >
                  {selectedCertificate.status}
                </span>
              </div>

              <div>
                <p className="text-yellow-400 font-semibold">
                  Buyer Name
                </p>

                <p>
                  {selectedCertificate.buyerName || "Not Assigned"}
                </p>
              </div>

              <div>
                <p className="text-yellow-400 font-semibold">
                  Yield
                </p>

                <p>{selectedCertificate.yield} ml</p>
              </div>

              <div>
                <p className="text-yellow-400 font-semibold">
                  Harvest Date
                </p>

                <p>
                  {new Date(
                    selectedCertificate.harvestDate
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-yellow-400 font-semibold">
                  Distillation Date
                </p>

                <p>
                  {new Date(
                    selectedCertificate.distillationDate
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            {/* Verified Box */}

            <div className="mt-8 bg-green-900/40 border border-green-700 rounded-xl p-5">

              <h3 className="text-xl text-green-300 font-bold">
                ✅ Traceability Verified
              </h3>

              <p className="text-gray-300 mt-2">
                This certificate is digitally linked to the production batch
                stored in the Herbal Traceability System. Product information,
                harvesting details, distillation records and buyer information
                can be traced using this Batch ID.
              </p>

            </div>

            {/* Footer */}

            <div className="flex justify-between items-center mt-8 border-t border-green-800 pt-5">

              <p className="text-sm text-gray-400">
                AYUSH Certified • Batch Traceability Enabled
              </p>

              <button
                onClick={() => setSelectedCertificate(null)}
                className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg font-semibold transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      </div>
    )}
  </>
);
}