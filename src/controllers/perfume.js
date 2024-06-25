import { asyncHandler } from "../utils/asyncHandler.js";
import perfume from "../models/perfume.js";
export const newPerfume = asyncHandler(async (req, res, next) => {
  const { gallery, banner } = req?.files;
  const newPerfume = new perfume({
    ...req?.body,
    banner: banner[0]?.path,
    gallery,
  });
  await newPerfume.save();
  res
    .status(201)
    .json({ status: true, message: "New perfume created successfully!!" });
});

export const getAllPerfume = asyncHandler(async (req, res, next) => {
  const perfumeData = await perfume.find();
  res.status(200).json({ status: true, data });
});
