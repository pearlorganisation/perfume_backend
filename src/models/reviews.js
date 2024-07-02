import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    perfume: { type: mongoose.Types.ObjectId, ref: "perfume" },
    reviewBy: { type: mongoose.Types.ObjectId, ref: "auth" },
    reaction: { name: String, rating: Number },
    season: [{ name: String, rating: Number }],
    notes: [{ type: mongoose.Types.ObjectId, ref: "notes" }],
    longetivity: {
      type: String,
      enum: [
        "no vote",
        "very weak",
        "weak",
        "moderate",
        "long lasting",
        "eternal",
      ],
    },
    sillage: {
      type: String,
      enum: ["no vote", "intimate", "moderate", "strong", "enormous"],
    },
    gender: {
      type: String,
      enum: ["male", "more male", "unisex", "more female", "female"],
    },
    priceValue: {
      type: String,
      enum: ["way overpriced", "overpriced", "ok", "good value", "great value"],
    },
    review: {
      type: [{ review: String, gallery: [String] }],
    },
    pros: {
      type: [{ pros: String, likes: Number, disLikes: Number }],
    },
    cons: {
      type: [{ pros: String, likes: Number, disLikes: Number }],
    },
  },

  { timestamps: true }
);

export default mongoose.model("review", reviewsSchema, "review");
