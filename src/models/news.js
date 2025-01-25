import mongoose from "mongoose";
const newsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      minlength: [3, "Min Required Length for description is 3"],
      // maxlength:[500,"Min Required Length for description is 500"],
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// newsSchema.virtual('slug').get(function (){
//   return  this.title .trim() // Remove leading/trailing spaces
//   .toLowerCase() // Convert to lowercase
//   .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with '-'
//   .replace(/^-+|-+$/g, '');
// })

export default mongoose.model("news", newsSchema, "news");
