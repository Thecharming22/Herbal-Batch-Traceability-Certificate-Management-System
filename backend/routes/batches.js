import express from "express";
import Batch from "../models/Batch.js";
import Notification from "../models/Notification.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// POST: Add new batch
// POST: Add new batch
router.post("/", auth, async (req,res)=>{
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

// Create notification
await Notification.create({
  type: "success",
  title: "Batch Added Successfully",
  message: `Batch ${savedBatch.batchId} has been added to the traceability system.`,
});


if (savedBatch.certificateFileName) {
  await Notification.create({
    type: "certificate",
    title: "Certificate Linked",
    message: `Quality Certificate for Batch ${savedBatch.batchId} uploaded successfully.`,
  });
}
const batches = await Batch.find();

    const avg =
      batches.reduce((sum, b) => sum + Number(b.yield), 0) /
      batches.length;

    if (Number(savedBatch.yield) < avg * 0.8) {
      await Notification.create({
        type: "alert",
        title: "AI Alert",
        message: `Low yield detected in Batch ${savedBatch.batchId}. Review distillation process.`,
      });
    }
res.status(201).json(savedBatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// GET: Fetch certificate by plant variety
router.get("/certificate/:plant", async (req,res)=>{
  try {
    const batch = await Batch.findOne({
      plantVariety: { $regex: `^${req.params.plant}$`, $options: "i" },
    }).sort({ createdAt: -1 });

    if (!batch) {
      return res.status(404).json({
        message: "Certificate not found",
      });
    }

    res.json(batch);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
// GET: List all batches
router.get("/", auth, async (req,res)=>{
  try {
    const batches = await Batch.find();
    res.json(batches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PUT: Update batch by ID
router.put("/:id", auth, async (req,res)=>{
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
router.delete("/:id", auth, async (req,res)=>{
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.json({ message: "Batch deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PATCH: Dispatch batch by ID
router.patch("/:id/dispatch", auth, async (req,res)=>{
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
    await Notification.create({
  type: "dispatch",
  title: "Batch Dispatched",
  message: `Batch ${dispatchedBatch.batchId} has been dispatched to ${buyerName}.`,
});

res.json(dispatchedBatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
