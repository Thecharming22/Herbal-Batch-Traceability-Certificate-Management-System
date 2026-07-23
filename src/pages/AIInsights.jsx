// src/pages/AIInsights.jsx

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./AnimatedGraph.css";

export default function AIInsights() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [insights, setInsights] = useState({
    averageYield: 0,
    predictedYield: 0,
    lowYieldMessage: "",
    alerts: [],
    aiSummary: "",
    chartData: [],
  });

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError("");

    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/ai/insights",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "AI insight generation failed"
        );
      }

      setInsights({
        averageYield: data.averageYield,
        predictedYield: data.predictedYield,
        lowYieldMessage: data.lowYieldMessage,
        alerts: data.alerts || [],
        aiSummary: data.insight || "",
        chartData: data.chartData || [],
      });

    } catch (err) {
      console.error("AI Insights Error:", err);

      setError(
        "Unable to generate AI insights right now."
      );

    } finally {
      setLoading(false);
    }
  };

  const maxYield = Math.max(
    ...insights.chartData.map(
      (batch) => batch.yield
    ),
    1
  );

  return (
   <div className="flex flex-col lg:flex-row min-h-screen">

      {/* ================= DESKTOP SIDEBAR ================= */}

     <div className="hidden lg:flex lg:w-64">
  <Sidebar />
</div>


      {/* ================= MOBILE SIDEBAR ================= */}

      {sidebarOpen && (
        <>
         <div
  className="fixed inset-0 bg-black/60 z-40 lg:hidden"
  onClick={() =>
    setSidebarOpen(false)
  }
/>

<div className="fixed top-0 left-0 h-full z-50 lg:hidden">
            <Sidebar
              closeSidebar={() =>
                setSidebarOpen(false)
              }
            />
          </div>
        </>
      )}


      {/* ================= MAIN CONTENT ================= */}

      <div className="flex-1 flex flex-col p-2 sm:p-3 md:p-6 lg:p-8 bg-black/90 backdrop-blur-sm min-h-screen">

        {/* Mobile Hamburger */}

     <div className="flex items-start mb-4 lg:hidden">

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="text-white text-4xl leading-none"
          >
            ☰
          </button>

        </div>


        {/* ================= MAIN AI PANEL ================= */}

        <div className="bg-gradient-to-br from-green-950 via-green-900 to-black text-white shadow-2xl rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-8 border border-green-700/40">


          {/* ================= HEADER ================= */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>

              <p className="text-green-300 text-sm uppercase tracking-widest">
                Intelligent Analytics
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold mt-1 bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 bg-clip-text text-transparent">
                🌱 AI Insights
              </h2>

              <p className="text-gray-400 mt-2">
                Smart analysis of your herbal batch performance
              </p>

            </div>


            {/* Refresh Button */}

            <button
              onClick={fetchInsights}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading
                ? "Analyzing..."
                : " Refresh AI"}
            </button>

          </div>


          {/* ================= LOADING STATE ================= */}

          {loading && (

            <div className="mb-8 rounded-2xl p-6 bg-green-800/40 border border-yellow-400/30 text-center">

              <div className="flex justify-center gap-2 mb-4">

                <span className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce"></span>

                <span className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>

                <span className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>

              </div>

              <h3 className="text-xl font-bold text-yellow-300">
                🤖 AI is analyzing your data
              </h3>

              <p className="text-gray-400 mt-2">
                Herbal AI is generating intelligent batch insights...
              </p>

            </div>

          )}


          {/* ================= ERROR STATE ================= */}

          {error && (

            <div className="mb-8 p-5 rounded-2xl bg-red-950/70 border border-red-500/50">

              <p className="text-red-300 font-semibold">
                ❌ {error}
              </p>

              <button
                onClick={fetchInsights}
                className="mt-3 text-sm underline text-red-200"
              >
                Try Again
              </button>

            </div>

          )}


          {/* ================= AI SUMMARY ================= */}

          {insights.aiSummary && (

            <div className="mb-5 md:mb-8 p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-green-800/60 to-green-950/60 border border-yellow-400/30 shadow-lg">

              <div className="flex items-center gap-3 mb-4">

                <div className="text-3xl">
                  🤖
                </div>

                <div>

                 <h3 className="text-lg md:text-xl font-bold text-yellow-300">
                    AI Summary
                  </h3>

                  <p className="text-sm text-gray-400">
                    Generated from your batch history
                  </p>

                </div>

              </div>

              <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                {insights.aiSummary}
              </p>

            </div>

          )}


          {/* ================= METRIC CARDS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">


            {/* Average Yield */}

     <div className="p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-green-500/30 hover:border-yellow-400/50 transition">

              <p className="text-gray-400">
                Average Yield
              </p>
<h3 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 mt-2 md:mt-3">

                {insights.averageYield}

                <span className="text-lg text-gray-400 ml-2">
                  ml
                </span>

              </h3>

              <p className="text-sm text-green-300 mt-2">
                📊 Based on historical batches
              </p>

            </div>


            {/* Predicted Yield */}

            <div className="p-6 rounded-2xl bg-white/5 border border-green-500/30 hover:border-yellow-400/50 transition">

              <p className="text-gray-400">
                Predicted Next Batch
              </p>

              <h3 className="text-4xl font-extrabold text-green-300 mt-3">

                {insights.predictedYield}

                <span className="text-lg text-gray-400 ml-2">
                  ml
                </span>

              </h3>

              <p className="text-sm text-green-300 mt-2">
                🔮 AI prediction
              </p>

            </div>

          </div>



          {/* ================= AI ALERTS ================= */}

          <div className="mb-8">

          <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-3 md:mb-4">
              🔔 AI Alerts
            </h3>


            <div className="grid gap-3">

              {insights.alerts.length > 0 ? (

                insights.alerts.map(
                  (alert, index) => (

                    <div
                      key={index}
                      className="p-3 sm:p-4 rounded-lg md:rounded-xl text-sm sm:text-base bg-green-800/40 border border-green-600/30 hover:border-yellow-400/40 transition"
                    >
                      {alert}
                    </div>

                  )
                )

              ) : (

                <div className="p-5 rounded-xl bg-green-800/30 text-gray-400">
                  No alerts available.
                </div>

              )}

            </div>

          </div>


          {/* ================= CHART ================= */}

        <div className="p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl bg-black/30 border border-green-700/40">

            <div className="flex justify-between items-center mb-6">

              <div>

               <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-300">
                  📈 Batch Yield Analysis
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Compare yield performance across batches
                </p>

              </div>

            </div>


            {insights.chartData.length === 0 ? (

              <div className="text-center py-12 text-gray-400">
                📊 No batch data available for analysis.
              </div>

            ) : (

              <div className="overflow-x-auto">

                <div className="graphFrame min-w-[650px]">

                  {insights.chartData.map(
                    (batch, index) => {

                      const height =
                        (batch.yield / maxYield) * 90;

                      return (

                        <div
                          key={index}
                          className="graphBarWrapper"
                        >

                          <div
                            className="graphBar"
                            style={{
                              height: `${height}%`,
                              animationDelay:
                                `${index * 0.15}s`,
                            }}
                          >

                            <span className="graphValue">
                              {batch.yield} ml
                            </span>

                          </div>


                          <div className="graphLabel">
                            {batch.batchId}
                          </div>

                        </div>

                      );

                    }
                  )}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}