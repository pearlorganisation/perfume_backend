import { asyncHandler } from "../utils/asyncHandler.js";
import news from "../models/news.js";
import errorResponse from "../utils/errorResponse.js";

export const newNews = asyncHandler(async (req, res, next) => {
  const newDoc = new news({ ...req?.body, image: req?.file?.path });
  await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "created successfully!!", newDoc });
});

export const getAllNews = asyncHandler(async (req, res, next) => {
  const data = await news.find();
  res.status(200).json({ status: true, data });
});

export const deleteNews = asyncHandler(async (req, res, next) => {
  const deletedData = await news.findByIdAndDelete(req?.params?.id);
  if (!deletedData) {
    return next(new errorResponse("No data found with given id!! "));
  }
  res
    .status(200)
    .json({ status: true, mesasge: "News deleted successfully!!" });
});
