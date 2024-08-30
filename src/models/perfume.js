import mongoose from "mongoose";

const ratingFragramSchema = new mongoose.Schema({
  longitivity: {
    min: 0,
    max: 10,
    type: Number,
    required: [true, "Required Field"],
  },
  sillage: {
    min: 0,
    max: 10,
    type: Number,
    required: [true, "Required Field"],
  },
  compliment: {
    min: 0,
    max: 10,
    type: Number,
    required: [true, "Required Field"],
  },
  overall: {
    min: 0,
    max: 10,
    type: Number,
    required: [true, "Required Field"],
  },
  pricing: {
    type: Number,
    min: 0,
    max: 10,
    required: [true, "Required Field"],
  },
  gender: {
    type: String,
    required: [true, "Required Field"],
    maxlength: 1,
    enum: ["M", "F", "O"],
  },
});

import { ProductReviewCount } from "./productReviewCount.js";
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
      // required: true,
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
          logo: String,
        },
      ],
    },
    pros: {
      type: [{ pros: String, likes: Number, disLikes: Number }],
      type: [{}],
    },
    cons: {
      type: [{ pros: String, likes: Number, disLikes: Number }],
      type: [{}],
    },
    mainAccords: [{ name: String, color: String, percentage: Number }],

    baseNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    topNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    middleNote: [{ type: mongoose.Types.ObjectId, ref: "notes" }],

    ratingFragrams: {
      type: ratingFragramSchema,
    },
    productReviewCoundId: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

perfumeSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      // Create a new ProductReviewCount document
      const newCount = await ProductReviewCount.create({
        totalVotes: 0,
        productId: this._id,
      });

      // Assign the _id of the new ProductReviewCount document to productReviewCoundId
      this.productReviewCoundId = newCount._id;

      next(); // Proceed with saving the perfume document
    } catch (error) {
      next(error); // Handle errors
    }
  } else {
    next(); // Skip if document is not new (for updates)
  }
});

export default mongoose.model("perfume", perfumeSchema, "perfume");
