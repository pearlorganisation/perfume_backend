import { asyncHandler } from "../utils/asyncHandler.js";
import perfume from "../models/perfume.js";
export const newPerfume = asyncHandler(async (req, res, next) => {
  const newPerfume = new perfume({ ...req?.body, banner: req?.file?.path });
  await newPerfume.save();
  res
    .status(201)
    .json({ status: true, message: "New perfume created successfully!!" });
});

export const getAllPerfume = asyncHandler(async (req, res, next) => {
  const perfumeData = await perfume.find();
  res.status(200).json({ status: true, data });
});
