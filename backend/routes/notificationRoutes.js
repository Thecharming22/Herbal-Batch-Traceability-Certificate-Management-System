import express from "express";
import Notification from "../models/Notification.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, async (req,res)=>{
  const notifications = await Notification.find().sort({
    createdAt: -1,
  });

  res.json(notifications);
});
router.patch("/read", auth, async (req,res)=>{
  try {
    await Notification.updateMany(
      { read: false },
      { $set: { read: true } }
    );

    res.json({ message: "Notifications marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;