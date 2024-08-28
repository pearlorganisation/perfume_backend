import mongoose from "mongoose";
const perfumeSchema = new mongoose.Schema(
  {
    perfume: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
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
    gallery: [],
    purchaseLinks: {
      type: [
        {
          link: String,
          company: String,
          linkType: Number,
          logo:String,
        },
      ],
    },
    pros: {
      type: [{ pros: String, likes: Number, disLikes: Number }],
    },
    cons: {
      type: [{ pros: String, likes: Number, disLikes: Number }],
    },
    mainAccords: [{ name: String, color: String, percentage: Number }],

    baseNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    topNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    middleNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],
  },
  { timestamps: true }
);

export default mongoose.model("perfume", perfumeSchema, "perfume");
