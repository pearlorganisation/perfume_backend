import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    reaction: { name: String, rating: Number },
    season: [{ name: String, rating: Number }],
    notes: [{ type: mongoose.Types.ObjectId, ref: "notes" }],
    longetivity: [{ name }],
  },

  { timestamps: true }
);

export default reviewsSchema;
