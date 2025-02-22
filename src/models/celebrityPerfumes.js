import mongoose from "mongoose";

const celebrityPerfumesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    banner: {
      type: String,
      required: [true, "Banner is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail Is Required Field !!"],
    },
    imageAttribute: {
      type: String,
    },
    // perfumeId: {
    //   type: String,
    //   default: null,
    // },
    slug: {
      trim: true,
      type: String,
    },
  },
  { timestamps: true }
);

celebrityPerfumesSchema.pre("save", function (next) {
  // Remove special characters and replace spaces with hyphens
  this.slug = this.title
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
    .trim() // Trim leading and trailing whitespace
    .replace(/\s+/g, "-"); // Replace spaces with hyphens

  next();
});

export default mongoose.model(
  "celebrityPerfumes",
  celebrityPerfumesSchema,
  "celebrityPerfumes"
);
