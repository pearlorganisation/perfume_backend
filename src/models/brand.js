import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("brand", brandSchema, "brand");
