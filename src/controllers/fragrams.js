import { fragrams as fragramsModel } from "../models/fragrams.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addFragram = asyncHandler(async (req, res, next) => {
  const { title, postBy, link, rating, perfumeId } = req?.body;

  if (!perfumeId) {
    res.status(500).json({ status: false, message: "Missing Perfume ID" });
  }

  const { banner } = req?.files;

  if (!title && !banner && !postBy && !rating && !link) {
    res.status(500).json({ status: false, message: "Incomplete data" });
  }

  const payload = {
    title,
    banner: banner[0]?.path,
    postBy,
    link,
    rating,
    perfume: perfumeId,
  };

  await fragramsModel.create(payload);

  const result = await fragramsModel.find({ perfume: perfumeId });

  res
    .status(200)
    .json({ status: true, message: "Fragram Added", data: result });
});

export const getFragrams = asyncHandler(async (req, res, next) => {
  const { perfumeId } = req?.query;

  if (!perfumeId) {
    res.status(500).json({ status: false, message: "Missing Perfume ID" });
  }

  const fragramsData = await fragramsModel
    .find({ perfume: perfumeId })
    .populate({
      path: "perfume",
      as: "perfume",
      select: "perfume banner",
    })
    .sort({ createdAt: -1 });

  res.status(200).json({ status: true, data: fragramsData });
});

export const deleteFragram = asyncHandler(async (req, res, next) => {
  const isValidId = await fragramsModel.findByIdAndDelete(req?.params?.id);
  if (!isValidId) {
    return res
      .status(400)
      .json({ status: true, message: "No data found with given id!!" });
  }

  res.status(200).json({
    status: true,
    message: "Deleted successfully!!",
  });
});

export const getSingleFragram = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;

  if (!id) {
    req.status(500).json({ status: false, message: "Missing ID" });
  }

  const data = await fragramsModel.findById(id);
  if (!data) {
    return res.status(400).json({
      status: false,
      message: "No data found with given id!!",
    });
  }
  res.status(200).json({ status: true, data });
});

export const updateFragram = asyncHandler(async (req, res) => {
  const { title, postBy, rating, link } = req?.body;
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing id" });
  }

  const payload = {
    title,
    link,
    postBy,
    rating,
  };

  const { banner } = req?.files;

  if (banner && banner?.length > 0) {
    payload.banner = banner[0]?.path;
  }

  console.log(payload);

  await fragramsModel.findOneAndUpdate({ _id: id }, payload);
  res
    .status(200)
    .json({ status: true, message: "Fragram Updated successfully" });
});
