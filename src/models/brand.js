import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "Min Value must be greater than 3"],
      maxlength: [50, "Max Value must be less than 50"],
    },
    slug: { type: String, trim: true, unique: true },
  },

  { timestamps: true }
);

export default mongoose.model("brand", brandSchema, "brand");
