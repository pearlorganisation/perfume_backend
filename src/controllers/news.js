import { asyncHandler } from "../utils/asyncHandler.js";
import newsModel from "../models/news.js";
import errorResponse from "../utils/errorResponse.js";

export const newNews = asyncHandler(async (req, res, next) => {
  console.log("sadfsadfas", req.body);

  const newDoc = new newsModel({ ...req?.body, image: req?.file?.path });
  await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "created successfully!!", newDoc });
});

export const getAllNews = asyncHandler(async (req, res, next) => {
  const data = await newsModel.find();
  res.status(200).json({ status: true, data });
});

export const getNewsById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing id" });
  }
  const data = await newsModel.findById({ _id: id });
  res.status(200).json({ status: true, data });
});

export const deleteNews = asyncHandler(async (req, res, next) => {
  const deletedData = await newsModel.findByIdAndDelete(req?.params?.id);
  if (!deletedData) {
    return next(new errorResponse("No data found with given id!! "));
  }
  res
    .status(200)
    .json({ status: true, mesasge: "News deleted successfully!!" });
});

export const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(500).json({ status: false, message: "Missing id" });
  }

  const payload = {
    title: req.body.title,
    content: req.body.content,
  };

  const banner = req?.file;

  if (banner) {
    payload.image = banner.path;
  }

  const updateModel = await newsModel.findOneAndUpdate({ _id: id }, payload);
  updateModel.save();

  res.status(200).json({ status: true, message: "Blog Updated successfully" });
});
