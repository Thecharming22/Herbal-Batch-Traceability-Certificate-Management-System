import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  batchId: {
    type: String,
    unique: true
  },

  plantVariety: {
    type: String,
    required: true
  },

  harvestDate: {
    type: Date,
    required: true
  },

  distillationDate: {
    type: Date,
    required: true
  },

  yield: {
    type: Number,
    required: true
  },

  certificateFileName: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Dispatched"],
    default: "Pending"
  },

  buyerName: {
    type: String,
    default: ""
  }

}, { timestamps: true });

export default mongoose.model("Batch", batchSchema);