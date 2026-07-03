import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import BellIcon from "../assets/bell.png";
import ProfileIcon from "../assets/profile.png";

// Sidebar Component
// Sidebar Component
function Sidebar() {
  return (
    <div className="w-64 p-6 shadow flex flex-col 
                    bg-green-900/30 backdrop-blur-sm">
      {/* Sidebar Title */}
      <h1 
        className="font-extrabold text-3xl mb-6
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
        🌿 Herbal Traceability
      </h1>

      {/* Quick Menu Section */}
      <div className="mb-6 p-4">
        <ul className="space-y-4 text-lg font-semibold text-white">
          
          <li>
            <Link to="/add-batch" className="block w-full text-left px-4 py-2 bg-green-800/40 hover:bg-green-700/60 transition">
              Add Batch
            </Link>
          </li>
          <li>
            <Link to="/batch-records" className="block w-full text-left px-4 py-2 bg-green-800/40 hover:bg-green-700/60 transition">
              Batch Records
            </Link>
          </li>
          <li>
            <Link to="/ai-insights" className="block w-full text-left px-4 py-2 bg-green-800/40 hover:bg-green-700/60 transition">
              AI Insights
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block w-full text-left px-4 py-2 bg-green-800/40 hover:bg-green-700/60 transition">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}


// Main Dashboard
export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [viewBatch, setViewBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const [dashboardData, setDashboardData] = useState({
  totalBatches: 0,
  pending: 0,
  dispatched: 0,
  certificates: 0,
  averageYield: 0,
  predictedYield: 0,
  highestYield: "-",
  lowestYield: "-",
  recentBatches: [],
  alerts: [],
  lowYieldDetected: false,
});
useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/batches");
    const data = await res.json();

    const totalBatches = data.length;
    const pending = data.filter(
      (b) => b.status === "Pending"
    ).length;

    const dispatched = data.filter(
      (b) => b.status === "Dispatched"
    ).length;

    const certificates = data.filter(
      (b) => b.certificateFileName
    ).length;

    const totalYield = data.reduce(
      (sum, b) => sum + Number(b.yield),
      0
    );

    const averageYield =
      totalBatches > 0
        ? (totalYield / totalBatches).toFixed(2)
        : 0;
const lowYieldBatches = data.filter(
  (batch) => Number(batch.yield) < Number(averageYield) * 0.8
);
    const sorted = [...data].sort(
      (a, b) => b.yield - a.yield
    );
const alerts = [];

const predictedYield =
  totalBatches > 0
    ? Math.round(Number(averageYield))
    : 0;

if (totalBatches === 0) {
  alerts.push("📂 No historical batch data available.");
}
else if (totalBatches === 1) {
  alerts.push(
    "🤖 AI needs more historical batches for accurate yield prediction."
  );
}
else {


if (lowYieldBatches.length > 0) {
  alerts.push(
    `⚠ Low yield detected in batch(s): ${lowYieldBatches
      .map((b) => b.batchId)
      .join(", ")}`
  );
} else {
  alerts.push("✅ No abnormal yield detected.");
}

alerts.push(
  `🌿 Expected yield for the next batch is approximately ${predictedYield} ml.`
);
}
  setDashboardData({
  totalBatches,
  pending,
  dispatched,
  certificates,
  averageYield,
  predictedYield,
  highestYield: sorted[0]?.batchId || "-",
  lowestYield: sorted[sorted.length - 1]?.batchId || "-",
  recentBatches: data.slice(-5).reverse(),
  alerts,
  lowYieldDetected: lowYieldBatches.length > 0,
});

  } catch (err) {
    console.log(err);
  }
};
  if (!token) return <Navigate to="/login" />;
const filteredBatches = dashboardData.recentBatches.filter((batch) =>
  batch.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  batch.plantVariety.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
   <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col p-6 bg-gray-100/70 backdrop-blur-md">
        
        {/* Top Section */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Heading */}
          <h1 className="text-3xl font-bold text-black">
          Welcome, Admin!
          </h1>

          {/* Center: Search Bar */}
          <div className="flex-1 flex justify-center px-6">
            <div className="flex items-center border-2 border-black rounded px-3 py-2 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300">
              <span className="mr-2 text-gray-700 text-lg">🔍</span>
             <input
  type="text"
  placeholder="Search by Batch ID or Plant..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="bg-transparent outline-none text-black placeholder-gray-700 w-full"
/>
            </div>
          </div>

          {/* Right: Only images with black border (equal size) */}
        <div className="flex items-center gap-4">

{/* Notification */}
<div className="relative">
  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="cursor-pointer transition"
  >
    <img
      src={BellIcon}
      alt="Notification"
      className="w-10 h-10 border border-black rounded-full"
    />
  </button>

  {showNotifications && (
    <div className="absolute right-0 mt-3 w-80 bg-green-800 text-white rounded-lg shadow-xl border border-gray-300 z-50">

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-400 font-bold text-lg">
        🔔 Your Notifications
      </div>

      {/* Items */}
      <div className="px-4 py-3 border-b border-gray-400 hover:bg-green-800/60 transition">
        🌱 Batch <b>B004</b> added successfully.
      </div>

      <div className="px-4 py-3 border-b border-gray-400 hover:bg-green-800/60 transition">
        📄 Certificate <b>ROSE004.pdf</b> linked.
      </div>

      <div className="px-4 py-3 hover:bg-green-800/60 transition">
        📦 Batch <b>B002</b> dispatched successfully.
      </div>

    </div>
  )}
</div>

 {/* Profile */}
<div className="relative">
  <button
    onClick={() => setShowProfile(!showProfile)}
    className="cursor-pointer transition"
  >
    <img
      src={ProfileIcon}
      alt="Profile"
      className="w-10 h-10 border border-black rounded-full"
    />
  </button>

  {showProfile && (
    <div className="absolute right-0 mt-3 w-72 bg-green-800 text-white rounded-lg shadow-xl border border-gray-300 z-50">


      {/* ✅ My Profile link */}
      <Link
        to="/profile"
        className="w-full text-left px-4 py-3 hover:bg-red-200 text-red-600 transition rounded"
      >
        👤 My Profile
      </Link>

      {/* Footer */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="w-full text-left px-4 py-3 hover:bg-red-200 text-red-600 transition rounded"
      >
        🚪 Logout
      </button>
    </div>
  )}
</div>


</div>
        </div>
{/* Summary Cards */}
<div className="grid grid-cols-5 gap-6 mb-12">
  <div className="bg-green-900/100 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
      Total Batches
    </h3>
    <p className="text-3xl mt-2">{dashboardData.totalBatches}</p>
  </div>
  <div className="bg-green-900/100 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
    Pending Dispatch
    </h3>
    <p className="text-3xl mt-2">{dashboardData.pending}</p>
  </div>
  <div className="bg-green-900/100 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
      Dispatched
    </h3>
    <p className="text-3xl mt-2">{dashboardData.dispatched}</p>
  </div>
  <div className="bg-green-900/100 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
     Certificates Linked
    </h3>
    <p className="text-3xl mt-2">{dashboardData.certificates}</p>
  </div>
  <div className="bg-green-900/100 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
      Average Yield
    </h3>
    <p className="text-3xl mt-2">{dashboardData.averageYield} ml</p>
  </div>
</div>


{/* AI Insights Section */}
<div className="bg-green-900/100 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg mt-8">
  <h2 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine"> AI Insights</h2>

  <div className="border-t border-gray-400 pt-4 mt-2">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">Average Yield</h3>
    <p className="text-2xl mt-2">{dashboardData.averageYield} ml</p>
  </div>
<div className="border-t border-gray-400 pt-4 mt-6">
  <h3
    className="text-2xl font-extrabold
    bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500
    bg-clip-text text-transparent animate-shine"
  >
    Low Yield Detection
  </h3>

<p className="text-2xl mt-2">
  {dashboardData.lowYieldDetected
    ? dashboardData.alerts.find((alert) =>
        alert.includes("Low yield detected")
      )
    : "No abnormal yield detected."}
</p>
</div>
<div className="border-t border-gray-400 pt-4 mt-6">
  <h3
    className="text-2xl font-extrabold
    bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500
    bg-clip-text text-transparent animate-shine"
  >
    Predicted Next Batch Yield
  </h3>

  <p className="text-2xl mt-2">
    {dashboardData.predictedYield} ml
  </p>
</div>
  <div className="border-t border-gray-400 pt-4 mt-6">
  <h3 className="text-2xl font-extrabold
                 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500
                 bg-clip-text text-transparent animate-shine">
    AI Alerts
  </h3>

  <div className="mt-3 space-y-3">
    {dashboardData.alerts.map((alert, index) => (
      <div
        key={index}
        className="bg-green-800 rounded-lg p-3 text-lg"
      >
        {alert}
      </div>
    ))}
  </div>
</div>
</div>

{/* Recent Batch Records Section */}
<div className="bg-green-900/100 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg mt-12">
  <h2 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">Recent Batch Records</h2>

  <div className="border-t border-gray-400 pt-4 mt-2">
    <div className="grid grid-cols-7 gap-4 font-semibold text-lg">
      <span>Batch ID</span>
      <span>Plant</span>
      <span>Harvest Date</span>
      <span>Yield</span>
      <span>Certificate</span>
      <span>Status</span>
      <span>Action</span>
    </div>
  </div>
{filteredBatches.map((batch) => (
  <div
    key={batch._id}
    className="grid grid-cols-7 gap-4 py-3 border-t border-gray-700 items-center"
  >
    <span>{batch.batchId}</span>

    <span>{batch.plantVariety}</span>

    <span>
      {new Date(batch.harvestDate).toLocaleDateString()}
    </span>

    <span>{batch.yield} ml</span>

    <span>{batch.certificateFileName}</span>

    <span
      className={`font-semibold ${
        batch.status === "Pending"
          ? "text-yellow-300"
          : "text-green-300"
      }`}
    >
      {batch.status}
    </span>

    <span>
<button
  onClick={() => setViewBatch(batch)}
  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm"
>
  View
</button>
</span>
  </div>
))}
</div>

      </div>
      {viewBatch && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">

    <div className="bg-white rounded-xl shadow-2xl w-[500px] max-w-[95%] p-8">

      <h2 className="text-2xl font-bold text-black mb-6">
        Batch Details
      </h2>

      <div className="space-y-3 text-black">

        <p><strong>Batch ID:</strong> {viewBatch.batchId}</p>

        <p><strong>Plant Variety:</strong> {viewBatch.plantVariety}</p>

        <p>
          <strong>Harvest Date:</strong>{" "}
          {new Date(viewBatch.harvestDate).toLocaleDateString()}
        </p>

        <p>
          <strong>Distillation Date:</strong>{" "}
          {new Date(viewBatch.distillationDate).toLocaleDateString()}
        </p>

        <p><strong>Yield:</strong> {viewBatch.yield} ml</p>

        <p>
          <strong>Certificate:</strong>{" "}
          {viewBatch.certificateFileName || "Not Available"}
        </p>

        <p><strong>Status:</strong> {viewBatch.status}</p>

        <p>
          <strong>Buyer:</strong>{" "}
          {viewBatch.buyerName || "Not Assigned"}
        </p>

      </div>

      <div className="flex justify-end mt-6">

        <button
          onClick={() => setViewBatch(null)}
          className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}
