import express from "express";
import Batch from "../models/Batch.js";

const router = express.Router();

// POST: Add new batch
// POST: Add new batch
router.post("/", async (req, res) => {
  try {

    // Find the latest batch
    const lastBatch = await Batch.findOne().sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastBatch) {
      nextNumber = parseInt(lastBatch.batchId.substring(1)) + 1;
    }

    const batch = new Batch({
      ...req.body,
      batchId: `B${String(nextNumber).padStart(3, "0")}`
    });

    const savedBatch = await batch.save();

    res.status(201).json(savedBatch);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// GET: List all batches
router.get("/", async (req, res) => {
  try {
    const batches = await Batch.find();
    res.json(batches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PUT: Update batch by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBatch = await Batch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.json(updatedBatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE: Remove batch by ID
router.delete("/:id", async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.json({ message: "Batch deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PATCH: Dispatch batch by ID
router.patch("/:id/dispatch", async (req, res) => {
  try {
    const { buyerName } = req.body;
    const dispatchedBatch = await Batch.findByIdAndUpdate(
      req.params.id,
      { status: "Dispatched", buyerName },
      { new: true }
    );
    if (!dispatchedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.json(dispatchedBatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
