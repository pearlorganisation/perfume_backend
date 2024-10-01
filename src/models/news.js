import mongoose from "mongoose";
const newsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("news", newsSchema, "news");
