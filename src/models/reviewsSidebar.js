import mongoose from "mongoose";

const reviewsSidebarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, "Min Length Should Be 3"],
      // maxlength:[30,"Max Length Should Be 30"]
    },
    description: {
      type: String,
      required: true,
      minlength: [3, "Min Length Should Be 3"],
      // maxlength:[300,"Max Length Should Be 300"]
    },
    reviewBy: {
      type: String,
      required: true,
      minlength: [3, "Min Length Should Be 3"],
      // maxlength:[300,"Max Length Should Be 300"]
    },
    productUrl: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const reviewsSidebarModel = mongoose.model(
  "reviewsSidebar",
  reviewsSidebarSchema,
  "reviewsSidebar"
);
