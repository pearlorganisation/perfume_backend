import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      minlength: [3, "Min Length For Brand Is 3."],
      maxlength: [60, "Max Length For Brand Is 60"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("brand", brandSchema, "brand");
