import mongoose from "mongoose";
const notesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength:[3,"Min Length for Notes must be greater than 3"],
      maxlength:[100,"Max Length for Notes must be less than 100"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("notes", notesSchema, "notes");
