import mongoose from "mongoose";

const sales_OffSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [3, "Min Value For Sales OF Title Is 3"],
      // maxlength:[120,"Max Value For Sales OF Title Is 120"]
    },
    mapOfLinks: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: ["Please Provide Valid Pricing Values !!"],
    },
    rating: {
      type: Number,
      min: [0, "Min Value For Sales Off Rating is zero !!"],
      max: [5, "Max Value For Sales Off Rating is 5 !!"],
    },
    banner: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const salesOffModel = new mongoose.model("SALES_OFF", sales_OffSchema);
