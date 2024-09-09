import mongoose from "mongoose";

const otherRelatedPerfumeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pricePerMl: {
      type: Number,
      required: true,
    },
    brandId: {
      type: mongoose.Schema.ObjectId,
      ref: "brand",
      index: true,
    },
  },
  { timestamps: true }
);

const OtherRelatedPerfume = mongoose.model(
  "OtherRelatedPerfume",
  otherRelatedPerfumeSchema
);

export default OtherRelatedPerfume;
