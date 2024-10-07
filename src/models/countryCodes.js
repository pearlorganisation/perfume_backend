import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
    required: true, // Optional: Set to true if you want to enforce this field
  },
  label: {
    type: String,
    unique: true,
    required: true, // Optional: Set to true if you want to enforce this field
  },
},{timestamps:true});

export const countryISOcodesModel = mongoose.model(
  "CountryISOcodes", // It's a good practice to use singular name
  countrySchema
);
