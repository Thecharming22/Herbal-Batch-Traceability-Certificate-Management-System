// src/pages/BatchRecords.jsx

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import dashImg from "../assets/dash.jpg";
import "./BatchRecords.css";
export default function BatchRecords() {
  const [batches, setBatches] = useState([]);
const [editingBatch, setEditingBatch] = useState(null);
const [dispatchingBatch, setDispatchingBatch] = useState(null);
const [buyerName, setBuyerName] = useState("");
const [editForm, setEditForm] = useState({
  plantVariety: "",
  harvestDate: "",
  distillationDate: "",
  yield: "",
  certificateFileName: ""
});
  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
       const token =localStorage.getItem("token") || sessionStorage.getItem("token")
  
     const res = await fetch("http://localhost:5000/api/batches", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      const data = await res.json();
      setBatches(data);
    } catch (err) {
      console.error("Error fetching batches:", err);
    }
  };
const handleDelete = (id) => {
  toast((t) => (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-black">
        🗑️ Are you sure you want to delete this batch?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            toast.dismiss(t.id);

            try {
              const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

              const res = await fetch(
                `http://localhost:5000/api/batches/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (res.ok) {
                toast.success("🗑️ Batch deleted successfully!");
                fetchBatches();
              } else {
                toast.error("Failed to delete batch.");
              }
            } catch (err) {
              console.error(err);
              toast.error("Server Error");
            }
          }}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ), {
    duration: Infinity,
  });
};
const handleEditChange = (e) => {
  setEditForm({
    ...editForm,
    [e.target.name]: e.target.value,
  });
};
const handleUpdate = async () => {
  try {
      const token =localStorage.getItem("token") || sessionStorage.getItem("token")
    const res = await fetch(
      `http://localhost:5000/api/batches/${editingBatch._id}`,
      {
        method: "PUT",
headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},
        body: JSON.stringify(editForm),
      }
    );

    if (res.ok) {
      toast.success("✏️ Batch updated successfully!");
      setEditingBatch(null);
      fetchBatches();
    } else {
      toast.error("Update failed.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server Error");
  }
};
const handleDispatch = async () => {
  if (!buyerName.trim()) {
    toast.error("Please enter buyer name.");
    return;
  }

  try {
   const token =
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");
    const res = await fetch(
      `http://localhost:5000/api/batches/${dispatchingBatch._id}/dispatch`,
      {
        method: "PATCH",
       
headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},
        body: JSON.stringify({
          buyerName,
        }),
      }
    );

    if (res.ok) {
      toast.success("🚚 Batch dispatched successfully!");

      setDispatchingBatch(null);
      setBuyerName("");

      fetchBatches();
    } else {
      toast.error("Dispatch failed.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server Error");
  }
};
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
  className="flex-1 p-6 bg-cover bg-center min-h-screen"
  style={{
    backgroundImage: `url(${dashImg})`
  }}
>
       <div className="bg-green-900/70 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">

          <h2
            className="text-2xl font-extrabold
            bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500
            bg-clip-text text-transparent animate-shine"
          >
            Batch Records
          </h2>

          {/* Table Header */}
          <div className="border-t border-gray-400 pt-4 mt-4">
            <div className="grid grid-cols-9 gap-4 font-semibold text-lg mb-4">
              <span>Batch ID</span>
              <span>Plant</span>
              <span>Harvest Date</span>
              <span>Distillation Date</span>
              <span>Yield</span>
              <span>Certificate</span>
              <span>Status</span>
              <span>Buyer</span>
              <span>Action</span>
            </div>

            {/* Table Rows */}
            {batches.length === 0 ? (
              <p className="text-center py-6 text-gray-300">
                No batch records found.
              </p>
            ) : (
              batches.map((batch) => (
                <div
                  key={batch._id}
                  className="grid grid-cols-9 gap-4 py-3 border-t border-gray-700 items-center"
                >
                  <span>{batch.batchId || batch._id.slice(-6).toUpperCase()}</span>

                  <span>{batch.plantVariety}</span>

                  <span>
                    {new Date(batch.harvestDate).toLocaleDateString()}
                  </span>

                  <span>
                    {new Date(batch.distillationDate).toLocaleDateString()}
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
                    {batch.buyerName ? batch.buyerName : "-"}
                  </span>

                 <span className="flex items-center justify-center gap-1">
                   <button
  onClick={() => {
    setEditingBatch(batch);

    setEditForm({
      plantVariety: batch.plantVariety,
      harvestDate: batch.harvestDate.split("T")[0],
      distillationDate: batch.distillationDate.split("T")[0],
      yield: batch.yield,
      certificateFileName: batch.certificateFileName,
    });
  }}
  className="edit-btn"
>
  Edit
</button>
<button
  onClick={() => handleDelete(batch._id)}
 className="delete-btn"
>
  Delete
</button>

                    {batch.status === "Pending" && (
           <button
  onClick={() => setDispatchingBatch(batch)}
  className="dispatch-btn"
>
  Dispatch
</button>
                    )}
                  </span>
                </div>
              ))
            )}
          </div>
          
          {editingBatch && (
  <div className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-2xl w-[450px] max-w-[95%] p-8">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Edit Batch
      </h2>

      <input
        type="text"
        name="plantVariety"
        value={editForm.plantVariety}
        onChange={handleEditChange}
     className="w-full border border-gray-400 p-2 mb-3 rounded bg-white text-black"
        placeholder="Plant Variety"
      />

      <input
        type="date"
        name="harvestDate"
        value={editForm.harvestDate}
        onChange={handleEditChange}
        className="w-full border border-gray-400 p-2 mb-3 rounded bg-white text-black"
      />

      <input
        type="date"
        name="distillationDate"
        value={editForm.distillationDate}
        onChange={handleEditChange}
        className="w-full border border-gray-400 p-2 mb-3 rounded bg-white text-black"
      />

      <input
        type="number"
        name="yield"
        value={editForm.yield}
        onChange={handleEditChange}
       className="w-full border border-gray-400 p-2 mb-3 rounded bg-white text-black"
        placeholder="Yield"
      />

      <input
        type="text"
        name="certificateFileName"
        value={editForm.certificateFileName}
        onChange={handleEditChange}
     className="w-full border border-gray-400 p-2 mb-3 rounded bg-white text-black"
        placeholder="Certificate File Name"
      />

     <div className="flex justify-end gap-3 mt-6"> 
        <button
          onClick={() => setEditingBatch(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}
{dispatchingBatch && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">

    <div className="bg-white rounded-xl shadow-2xl w-[420px] p-8">

      <h2 className="text-2xl font-bold mb-5 text-black">
        Dispatch Batch
      </h2>

      <input
        type="text"
        placeholder="Buyer Name"
        value={buyerName}
        onChange={(e) => setBuyerName(e.target.value)}
        className="w-full border border-gray-400 p-2 rounded mb-5 text-black"
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() => {
            setDispatchingBatch(null);
            setBuyerName("");
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleDispatch}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Dispatch
        </button>

      </div>

    </div>

  </div>
)}
        </div>
      </div>
    </div>
  );
}