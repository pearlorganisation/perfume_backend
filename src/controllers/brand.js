import brand from "../models/brand.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

export const newBrand = asyncHandler(async (req, res, next) => {
  const newBrand = new brand(req?.body);
  await newBrand.save();
  const data = await brand.find();
  res.status(201).json({ status: true, message: "Created successfully!!" });
});

export const getAllBrands = asyncHandler(async (req, res, next) => {
  const data = await brand.find();
  res.status(200).json({ status: true, data });
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const isValidId = await brand.findByIdAndDelete(req?.params?.id);
  const data = await brand.find();
  if (!isValidId) {
    return res
      .status(400)
      .json({ status: true, message: "No data found with given id!!" });
  }
  res.status(200).json({ status: true, message: "Deleted Successfully!!" });
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  const isValidId = await brand.findByIdAndUpdate(req?.params?.id, req?.body);
  const data = await brand.find();
  if (!isValidId) {
    return res
      .status(400)
      .json({ status: true, message: "brand updated successfully!!" });
  }
  res.status(200).json({
    status: true,
    data,
    message: "updated sucessfully!! Successfully!!",
  });
});
