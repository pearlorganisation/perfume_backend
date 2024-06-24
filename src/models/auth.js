import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
  },

  { timestamps: true }
);

export default mongoose.model("auth", authSchema, "auth");
