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
    gallery: [String],
    purchaseLinks: {
      type: [
        {
          link: String,
          company: String,
          linkType: Number,
        },
      ],
    },

    mainAccords: [{ name: String, color: String, percentage: Number }],

    baseNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    topNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    middleNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],
  },
  { timestamps: true }
);

export default mongoose.model("perfume", perfumeSchema, "perfume");
