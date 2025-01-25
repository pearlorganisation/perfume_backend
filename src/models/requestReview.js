import mongoose from "mongoose";

const requestReviewSchema = new mongoose.Schema(
  {
    images: {
      type: [{}],
    },
    perfumeName: {
      type: String,
      minlength: [
        3,
        "Perfume Name should be greater than 3 Words or more than that",
      ],
      //  maxlength:[150,"Perfume Name should be less than 150 Words"]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    description: {
      type: String,
      minlength: [5, "Perufume description should be greater than  5 Words"],
      //  maxlength: [350,"Perufume description should be greater than  150 Words"],
    },
    status: {
      type: String,
      enum: ["approved", "discarded", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const RequestReviewModel = new mongoose.model(
  "RequestReview",
  requestReviewSchema
);
