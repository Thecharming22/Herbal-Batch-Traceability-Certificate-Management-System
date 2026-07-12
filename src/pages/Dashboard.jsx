import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import BellIcon from "../assets/bell.png";
import ProfileIcon from "../assets/profile.png";
import "./AnimatedGraph.css";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
 const token =
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");
  if (!token) {
 return <Navigate to="/login" />;
}
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
const profileRef = useRef(null);
const recentRecordsRef = useRef(null);
  const [viewBatch, setViewBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
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
  chartData: [],
  alerts: [],
  lowYieldDetected: false,
});
useEffect(() => {
  fetchDashboard();
  fetchNotifications();
}, []);
useEffect(() => {
  function handleClickOutside(event) {

    // Close notification dropdown
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }

    // Close profile dropdown
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setShowProfile(false);
    }

  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
const markNotificationsAsRead = async () => {
  try {
    const token = localStorage.getItem("token");
   await fetch(
  "http://localhost:5000/api/notifications/read",
  {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    setUnreadCount(0);

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );

  } catch (err) {
    console.log(err);
  }
};
const fetchNotifications = async () => {
  try {

    const res = await fetch(
      "http://localhost:5000/api/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.log(data);
      return;
    }

    setNotifications(data);

    setUnreadCount(
      data.filter((n) => !n.read).length
    );

  } catch (err) {
    console.log(err);
  }
};
const fetchDashboard = async () => {
  try {
    const res = await fetch(
  "http://localhost:5000/api/batches",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    const data = await res.json();
if (!Array.isArray(data)) {
  console.log(data);
  return;
}
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
  chartData: data.map(batch => ({
    batchId: batch.batchId,
    yield: Number(batch.yield)
}))
});

  } catch (err) {
    console.log(err);
  }
};
const filteredBatches = dashboardData.recentBatches.filter((batch) =>
  batch.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  batch.plantVariety.toLowerCase().includes(searchTerm.toLowerCase())
);
useEffect(() => {
  if (!searched) return;

  const search = searchTerm.trim();

  if (search === "") {
    toast.warning("Please enter a Batch ID or Plant name.", {
      position: "top-center",
      autoClose: 2500,
    });

    setSearched(false);
    return;
  }

  if (filteredBatches.length > 0) {
    recentRecordsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    toast.error(`No batch or plant found for "${search}".`, {
      position: "top-center",
      autoClose: 3000,
    });
  }

  setSearched(false);
}, [searched]);
const maxYield = Math.max(
  ...dashboardData.chartData.map((b) => b.yield),
  1
);
  return (
   <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
     <div className="flex-1 flex flex-col p-6 bg-black/90 backdrop-blur-sm min-h-screen">
        
        {/* Top Section */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Heading */}
         

          {/* Center: Search Bar */}
          <div className="flex-1 flex justify-center px-6">
            <div className="flex items-center border-2 border-black rounded px-3 py-2 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300">
              <span className="mr-2 text-gray-700 text-lg">🔍</span>
<input
  type="text"
  placeholder="Search by Batch ID or Plant..."
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setSearched(false);
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      setSearched(true);
    }
  }}
  className="bg-transparent outline-none text-black placeholder-gray-700 w-full"
/>
            </div>
          </div>
          {/* Right: Only images with black border (equal size) */}
        <div className="flex items-center gap-4">

{/* Notification */}
<div className="relative" ref={notificationRef}>

 <button
  onClick={() => {
  setShowNotifications(!showNotifications);

  if (!showNotifications) {
    markNotificationsAsRead();
  }
}}
  className="cursor-pointer"
>
  <img
    src={BellIcon}
    alt="Notification"
    className="w-10 h-10 border border-black rounded-full"
  />

  {unreadCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
      {unreadCount}
    </span>
  )}

</button>

  {showNotifications && (

   <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">

      {/* Header */}

     <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-black">

  <h3
    className="text-lg font-extrabold
    bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500
    bg-clip-text text-transparent animate-shine"
  >
    Notifications
  </h3>

  <span className="text-xs bg-yellow-500 text-black font-bold px-2 py-1 rounded-full">
    {notifications.length}
  </span>

</div>

<div className="max-h-80 overflow-y-auto p-2 space-y-2 bg-black">
  {notifications.length === 0 ? (

<p className="text-center text-gray-300 py-4">
      No notifications available.
    </p>

  ) : (

   notifications.slice(0,5).map((item) => {

      let bg = "bg-green-100";
      let border = "border-green-600";
      let text = "text-green-900";
      let icon = "🌱";

      if (item.type === "certificate") {
        bg = "bg-blue-100";
        border = "border-blue-600";
        text = "text-blue-900";
        icon = "📄";
      }

      if (item.type === "dispatch") {
        bg = "bg-yellow-100";
        border = "border-yellow-500";
        text = "text-yellow-900";
        icon = "🚚";
      }

      if (item.type === "alert") {
        bg = "bg-red-100";
        border = "border-red-500";
        text = "text-red-900";
        icon = "⚠";
      }

      return (
  <div
  key={item._id}
  className={`${bg} border-l-4 ${border}
  rounded-xl px-4 py-3 flex gap-3
  shadow-sm hover:shadow-md
  transition-all duration-200
  ${
    item.type === "certificate"
      ? "hover:bg-blue-200"
      : item.type === "dispatch"
      ? "hover:bg-yellow-200"
      : item.type === "alert"
      ? "hover:bg-red-200"
      : "hover:bg-green-200"
  }`}
>
  <div className="text-lg mt-0.5">
    {icon}
  </div>

  <div className="flex-1">

  <p className={`text-sm font-semibold ${text}`}>
    {item.title}
  </p>

  <p className="text-xs text-gray-600 leading-5 mt-1">
    {item.message}
  </p>

  <p className="text-[11px] text-gray-400 mt-1">
    {new Date(item.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </p>

</div>

</div>
      );

    })

  )}

</div>

      </div>

  

  )}

</div>
 {/* Profile */}
<div className="relative" ref={profileRef}>
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
  <div className="absolute right-0 mt-3 w-72 bg-black rounded-xl shadow-xl border border-gray-700 z-50 overflow-hidden">

    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-black">

      <h3
        className="text-lg font-extrabold
        bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500
        bg-clip-text text-transparent animate-shine"
      >
        My Account
      </h3>

    </div>


    {/* Menu */}
    <div className="p-2 space-y-2 bg-black">

      <Link
        to="/profile"
        onClick={() => setShowProfile(false)}
        className="flex items-center gap-3 px-3 py-3 rounded-lg 
        bg-green-900/40 hover:bg-green-800/60 transition"
      >

        <span className="text-lg">👤</span>

        <div>
          <p className="text-sm font-semibold text-white">
            My Profile
          </p>

        
        </div>

      </Link>


      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg 
        bg-red-900/40 hover:bg-red-800/60 transition"
      >

        <span className="text-lg">🚪</span>

        <div className="text-left">

          <p className="text-sm font-semibold text-red-400">
            Logout
          </p>

          

        </div>

      </button>

    </div>

  </div>
)}
</div>


</div>
        </div>
{/* Summary Cards */}
<div className="grid grid-cols-5 gap-6 mb-12">
  <div className="bg-green-950 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
      Total Batches
    </h3>
    <p className="text-3xl mt-2">{dashboardData.totalBatches}</p>
  </div>
  <div className="bg-green-950 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
    Pending Dispatch
    </h3>
    <p className="text-3xl mt-2">{dashboardData.pending}</p>
  </div>
  <div className="bg-green-950 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
      Dispatched
    </h3>
    <p className="text-3xl mt-2">{dashboardData.dispatched}</p>
  </div>
  <div className="bg-green-950 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
     Certificates Linked
    </h3>
    <p className="text-3xl mt-2">{dashboardData.certificates}</p>
  </div>
  <div className="bg-green-950 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-extrabold 
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
      Average Yield
    </h3>
    <p className="text-3xl mt-2">{dashboardData.averageYield} ml</p>
  </div>
</div>


{/* AI Insights Section */}
<div className="bg-green-950 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg mt-8">
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
<div className="border-t border-gray-400 pt-6 mt-6">

<h3
className="text-2xl font-extrabold
bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500
bg-clip-text text-transparent animate-shine"
>
Batch Yield Graph
</h3>

<div className="graphFrame mt-6">

{dashboardData.chartData.map((batch,index)=>{

const height = (batch.yield / maxYield) * 80;

return(

<div
key={index}
className="graphBarWrapper"
>

<div
className="graphBar"
style={{
   height:`${height}%`,
   animationDelay:`${index*0.15}s`
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

{/* Recent Batch Records Section */}
<div
  ref={recentRecordsRef}
  className="bg-green-950 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg mt-12"
>
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
<ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="dark"
/>
    </div>
  );
}
