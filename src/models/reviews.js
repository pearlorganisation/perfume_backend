import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    perfume: { type: mongoose.Types.ObjectId, ref: "perfume" },
    reviewBy: { type: mongoose.Types.ObjectId, ref: "auth" },
    reaction: {
      name: {
        type: String,
        enum: ["Worst", "Good", "Not Good", "Fine", "Very Good"],
        required: true,
      },
    },
    likes: {
      type: Number,
      default: 0,
    },
    disLikes: {
      type: Number,
      default: 0,
    },

    season: [
      {
        name: {
          type: String,
          enum: ["Spring", "Summer", "Fall", "Winter", "day", "Night"],
          required: true,
        },
      },
    ],
    notes: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    longevity: {
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
    review: [
      {
        review: String,
        gallery: [String],
      },
    ],
    pros: [
      {
        pros: mongoose.Types.ObjectId,
        isLiked: Boolean,
      },
    ],
    cons: [
      {
        cons: mongoose.Types.ObjectId,
        isLiked: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("review", reviewsSchema, "review");
