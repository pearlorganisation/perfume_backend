import mongoose from "mongoose";

const celebrityPerfumesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    banner: {
      type: String,
      required: [true, "Banner is required"],
    },
    perfumeId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "celebrityPerfumes",
  celebrityPerfumesSchema,
  "celebrityPerfumes"
);
