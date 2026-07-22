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
  aiSummary: data.insight,
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
  ...insights.chartData.map((b) => b.yield),
  1
);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">

  {/* Desktop Sidebar */}
<div className="hidden md:flex md:w-64">
  <Sidebar />
</div>

{/* Mobile Sidebar */}
{sidebarOpen && (
  <>
    <div
      className="fixed inset-0 bg-black/60 z-40 md:hidden"
      onClick={() => setSidebarOpen(false)}
    />

    <div className="fixed top-0 left-0 h-full z-50 md:hidden">
      <Sidebar closeSidebar={() => setSidebarOpen(false)} />
    </div>
  </>
)}

  {/* Mobile Hamburger */}
  <div className="flex-1 flex flex-col p-4 md:p-6 bg-black/90 backdrop-blur-sm min-h-screen">
<div className="flex items-start mb-4 md:hidden">
  <button
    onClick={() => setSidebarOpen(true)}
    className="text-white text-4xl leading-none"
  >
    ☰
  </button>
</div>

        <div className="bg-green-950 text-white shadow-lg rounded-lg p-4 md:p-6">

          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 bg-clip-text text-transparent mb-6">
            🌱 AI Insights
          </h2>
{loading && (
  <div className="mb-6 p-4 rounded-lg bg-green-800 border border-yellow-400">
    <p className="text-yellow-300 text-lg">
      🌱 AI is analyzing your batch data...
    </p>

    <p className="text-gray-300 text-sm mt-1">
      Please wait while Herbal AI generates insights.
    </p>
  </div>
)}
{error && (
  <div className="mb-6 p-4 rounded-lg bg-red-900 border border-red-400">
    <p className="text-red-200">
      ❌ {error}
    </p>
  </div>
)}
{/* AI Summary */}
{insights.aiSummary && (
  <div className="border-t border-gray-400 pt-4 mb-6">
    <h3 className="text-xl font-bold text-yellow-300">
      🤖 AI Summary
    </h3>

    <p className="text-lg mt-3 text-gray-200 whitespace-pre-line">
      {insights.aiSummary}
    </p>
  </div>
)}
          {/* Average Yield */}
          <div className="border-t border-gray-400 pt-4">
            <h3 className="text-xl font-bold text-yellow-300">
              Average Yield
            </h3>

            <p className="text-lg mt-2">
              {insights.averageYield} ml
            </p>
          </div>
          {/* Lowest Yield */}
          <div className="border-t border-gray-400 pt-4 mt-6">
            <h3 className="text-xl font-bold text-yellow-300">
  Low Yield Detection
</h3>

<p className="text-lg mt-2">
  {insights.lowYieldMessage}
</p>
          </div>
<div className="border-t border-gray-400 pt-4 mt-6">
  <h3 className="text-xl font-bold text-yellow-300">
    Predicted Next Batch Yield
  </h3>

  <p className="text-lg mt-2">
    {insights.predictedYield} ml
  </p>
</div>
          {/* Alerts */}
          <div className="border-t border-gray-400 pt-4 mt-6">
            <h3 className="text-xl font-bold text-yellow-300">
              AI Alerts
            </h3>

            <ul className="mt-3 space-y-3">

              {insights.alerts.map((alert, index) => (
                <li
                  key={index}
                  className="bg-green-800 p-3 rounded"
                >
                  {alert}
                </li>
              ))}

            </ul>
          </div>

<div className="border-t border-gray-400 pt-6 mt-6">

  <h3 className="text-xl font-bold text-yellow-300">
    Batch Yield Analysis
  </h3>

 <div className="overflow-x-auto mt-6">
  <div className="graphFrame min-w-[650px]">

    {insights.chartData.map((batch, index) => {

      const height = (batch.yield / maxYield) * 90;

      return (

        <div
          key={index}
          className="graphBarWrapper"
        >

          <div
            className="graphBar"
            style={{
              height: `${height}%`,
              animationDelay: `${index * 0.15}s`
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

    })}

  </div>

</div>
        </div>

      </div>
  </div>
    </div>
  );
}