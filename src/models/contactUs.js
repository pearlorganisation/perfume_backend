import mongoose, { Schema } from "mongoose";

const contactUsSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, "Min Length For Name is 3"],
      // maxlength:[100,"Max Length For Name is 100"]
    },
    email: {
      type: String,
      minlength: [3, "Min Length For Name is 3"],
      // maxlength:[100,"Max Length For Name is 100"],
    },
    company: {
      type: String,
      minlength: [3, "Min Length For Name is 3"],
      // maxlength:[100,"Max Length For Name is 100"],
    },
    message: {
      type: String,
      minlength: [3, "Min Length For Name is 3"],
      // maxlength:[500,"Max Length For Name is 500"],
    },
  },
  {
    timestamps: true,
  }
);

export const contactUsModel = new mongoose.model("ContactUs", contactUsSchema);
