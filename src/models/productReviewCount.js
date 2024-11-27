import mongoose from "mongoose";

const productReviewCountSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
    },
    reaction: {
      worst: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      good: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      notGood: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      fine: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      veryGood: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
    },
    sillage: {
      noVote: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      intimate: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      moderate: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      strong: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      enormous: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
    },
    longevity: {
      noVote: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      veryWeak: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      weak: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      moderate: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      longLasting: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      eternal: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
    },
    gender: {
      male: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      moreMale: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      unisex: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      moreFemale: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      female: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
    },
    priceValue: {
      wayOverPriced: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      overPriced: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      ok: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      goodValue: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      greatValue: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
    },
    season: {
      spring: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      summer: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      fall: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      day: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      night: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
      winter: { type: Number, default: 0 ,min:[0,"Min Value Should be Zero!!"]},
    },
    totalVotes: {
      type: Number,
      default: 0,min:[0,"Min Value Should be Zero!!"]
    },
  },
  {
    timestamps: true,
  }
);

export const ProductReviewCount = mongoose.model(
  "ProductReviewCount",
  productReviewCountSchema
);
