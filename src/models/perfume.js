import mongoose from "mongoose";
const perfumeSchema = new mongoose.Schema(
  {
    perfume: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainAccords: [{ name: String, color: String, percentage: Number }],
    pyramid: {
      type: [{ topNote: [String], middleNote: [String], baseNote: [String] }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("perfume", perfumeSchema, "perfume");
