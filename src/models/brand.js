import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true ,unique:true,trim:true},
    slug:{type:String,trim:true,unique:true},
  },

  { timestamps: true }
);



export default mongoose.model("brand", brandSchema, "brand");
