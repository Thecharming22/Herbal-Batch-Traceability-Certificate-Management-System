// src/pages/AIInsights.jsx

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./AnimatedGraph.css";
export default function AIInsights() {
const [insights, setInsights] = useState({
  averageYield:0,
  predictedYield:0,
  lowYieldMessage:"",
  alerts:[],
  chartData:[]
});
  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
   const token =
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");

const res = await fetch(
  "http://localhost:5000/api/batches",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      const data = await res.json();
if (!res.ok) {
  console.log(data);
  return;
}
    if (!Array.isArray(data)) {
  console.log(data);
  return;
}

if (data.length === 0)  {
        setInsights({
          averageYield: 0,
          highestYield: "-",
          lowestYield: "-",
          alerts: ["No batch records available."],
        });
        return;
      }

      // Average Yield
      const totalYield = data.reduce(
        (sum, batch) => sum + Number(batch.yield),
        0
      );

      const averageYield = (
        totalYield / data.length
      ).toFixed(2);

      // Highest & Lowest Yield
      const sorted = [...data].sort(
        (a, b) => Number(b.yield) - Number(a.yield)
      );
const alerts = [];

const predictedYield =
  data.length > 0
    ? Math.round(Number(averageYield))
    : 0;

// AI needs enough history
if (data.length === 0) {
  alerts.push("📂 No historical batch data available.");
}

else if (data.length === 1) {
  alerts.push(
    "🤖 AI needs more historical batches for accurate yield prediction."
  );
}

else {

  // Low yield detection
  const lowYieldBatches = data.filter(
    (batch) =>
      Number(batch.yield) <
      Number(averageYield) * 0.8
  );

  let lowYieldMessage = "";

  if (lowYieldBatches.length > 0) {

    lowYieldMessage = `Low yield detected in batch(s): ${lowYieldBatches
      .map((b) => b.batchId)
      .join(", ")}`;

    alerts.push(
      `⚠ Low yield detected in batch(s): ${lowYieldBatches
        .map((b) => b.batchId)
        .join(", ")}`
    );

  } else {

    lowYieldMessage =
      "No abnormal yield detected.";

    alerts.push(
      "✅ No abnormal yield detected."
    );

  }

  alerts.push(
    `🌿 Expected yield for the next batch is approximately ${predictedYield} ml.`
  );

 setInsights({
  averageYield,
  predictedYield,
  lowYieldMessage,
  alerts,
  chartData: data.map((batch) => ({
    batchId: batch.batchId,
    yield: Number(batch.yield),
  })),
});

  return;
}

// For 0 or 1 batches
setInsights({
  averageYield,
  predictedYield,
  highestYield:
    sorted.length > 0
      ? `${sorted[0].batchId} (${sorted[0].yield} ml)`
      : "-",
  lowestYield:
    sorted.length > 0
      ? `${sorted[sorted.length - 1].batchId} (${sorted[sorted.length - 1].yield} ml)`
      : "-",
  lowYieldMessage: "-",
  alerts,
  chartData: data.map(batch => ({
   batchId: batch.batchId,
   yield: Number(batch.yield)
}))
});

    } catch (err) {
      console.log(err);
    }
  };
const maxYield = Math.max(
  ...insights.chartData.map((b) => b.yield),
  1
);
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col p-6 bg-black/90 backdrop-blur-sm min-h-screen">

        <div className="bg-green-950 text-white shadow-lg rounded-lg p-6">

          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 bg-clip-text text-transparent mb-6">
            🌱 AI Insights
          </h2>

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

  <div className="graphFrame mt-6">

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
  );
}