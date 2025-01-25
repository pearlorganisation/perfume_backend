import mongoose from "mongoose";

const brandLinkedImage = new mongoose.Schema(
  {
    brand: {
      unique: true,
      type: String,
      minlenght: [3, "Min Length is 3 Character !!"],
      // maxlength:[140,"Max length is 140 Character !!"],
      required: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image Url is a required field !!"],
    },
  },
  {
    timestamps: true,
  }
);

export const BrandLinkedImageModel = new mongoose.model(
  "BrandLinkedImages",
  brandLinkedImage
);
