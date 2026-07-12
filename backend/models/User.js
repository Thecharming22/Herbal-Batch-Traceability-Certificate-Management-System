import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },
googleId: {
  type: String,
},
  password: {
  type: String,
  required: function () {
    return !this.googleId;
  },
},

  role: {
    type: String,
    default: "Production Manager",
  },

  organization: {
    type: String,
    default: "Alaknanda Herbal & Essential Oil Distillers",
  },
profileImage: {
  type: String,
  default: ""
},
  // Forgot Password fields
  resetToken: { type: String },
  resetTokenExpiry: { type: Date }

}, { timestamps: true });

export default mongoose.model("User", userSchema);