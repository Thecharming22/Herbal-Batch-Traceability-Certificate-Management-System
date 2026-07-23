// src/pages/AddBatch.jsx
import "./AddBatch.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import toast from "react-hot-toast";
import purpleImg from "../assets/purple.jpg";
export default function AddBatch() {
  const [formData, setFormData] = useState({
    plantVariety: "",
    harvestDate: "",
    distillationDate: "",
    yield: "",
    certificateFileName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const token =
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/batches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to save batch");
    }

    toast.success("Batch added successfully!");
    console.log("Saved batch:", data);

    // Reset form
    setFormData({
      plantVariety: "",
      harvestDate: "",
      distillationDate: "",
      yield: "",
      certificateFileName: "",
    });

  } catch (err) {
    console.error("Error saving batch:", err);
    toast.error(err.message || "Failed to save batch");
  }
};
  return (
  <div className="flex flex-col md:flex-row min-h-screen">

  {/* Desktop Sidebar */}
<div className="hidden lg:flex lg:w-64">
  <Sidebar closeSidebar={() => {}} />
</div>

  {/* Mobile Sidebar */}
  {sidebarOpen && (
    <>
      <div
  className="fixed inset-0 bg-black/60 z-40 lg:hidden"
  onClick={() => setSidebarOpen(false)}
/>

<div className="fixed top-0 left-0 h-full z-50 lg:hidden">
  <Sidebar closeSidebar={() => setSidebarOpen(false)} />
</div>
    </>
  )}

  {/* Main Content */}
  <div
    className="flex-1 flex flex-col bg-cover bg-center"
    style={{
      backgroundImage: `url(${purpleImg})`,
    }}
  >
    <div className="flex items-center p-4">

{!sidebarOpen && (
  <button
    onClick={() => setSidebarOpen(true)}
    className="lg:hidden text-white text-4xl"
  >
    ☰
  </button>
)}
</div>
<div className="flex-1 flex items-center justify-center p-4 sm:p-5 lg:p-6">
        <div className="book">
          {/* Cover text */}
          <div className="cover">
            <p>Fill the Form</p>
          </div>

          {/* Form inside book */}
          <form
            className="w-full space-y-4 text-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold">🌱 Add New Batch</h1>
            <p className="text-gray-700">
              Here you can register a new herbal batch.
            </p>

            <div className="text-left">
              <label className="block font-semibold">
                Plant Variety
              </label>
              <input
                type="text"
                name="plantVariety"
                placeholder="Enter plant variety"
                value={formData.plantVariety}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="text-left">
              <label className="block font-semibold">
                Harvest Date
              </label>
              <input
                type="date"
                name="harvestDate"
                value={formData.harvestDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="text-left">
              <label className="block font-semibold">
                Distillation Date
              </label>
              <input
                type="date"
                name="distillationDate"
                value={formData.distillationDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="text-left">
              <label className="block font-semibold">
                Yield (ml)
              </label>
              <input
                type="number"
                name="yield"
                placeholder="Enter yield"
                value={formData.yield}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="text-left">
              <label className="block font-semibold">
                Certificate File Name
              </label>
              <input
                type="text"
                name="certificateFileName"
                placeholder="Enter Certificate file name"
                value={formData.certificateFileName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600"
            >
              Save Batch
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}