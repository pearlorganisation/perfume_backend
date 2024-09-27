import { NewArrivalPerfume as newArrivalModel } from "../models/newArrival.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addNewArrival = asyncHandler(async (req, res, next) => {
  const { perfumeName, brand, link } = req?.body;

  const { banner } = req?.files;

  if (!perfumeName && !banner && !brand && !link) {
    res.status(400).json({ status: false, message: "Incomplete data" });
  }

  const payload = { perfumeName, banner: banner[0]?.path, brand, link };

  console.log(payload);

  await newArrivalModel.create(payload);

  const result = await newArrivalModel.find({});

  res
    .status(200)
    .json({ status: true, message: "Perfume Review Added", data: result });
});

export const getNewArrival = asyncHandler(async (req, res, next) => {
  const limit = 25;
  const reviewsSidebarData = await newArrivalModel
    .find({})
    .populate(["brand"])
    .sort({ createdAt: -1 })
    .limit(limit);

  res.status(200).json({ status: true, data: reviewsSidebarData });
});

export const deleteNewArrival = asyncHandler(async (req, res, next) => {
  const isValidId = await newArrivalModel.findByIdAndDelete(req?.params?.id);
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

export const getSingleNewArrival = asyncHandler(async (req, res, next) => {
  const data = await newArrivalModel.findById(req?.params?.id);
  if (!data) {
    return res.status(400).json({
      status: false,
      message: "No data found with given id!!",
    });
  }

  res.status(200).json({ status: true, data });
});

export const getAllNewArrival = asyncHandler(async (req, res, next) => {
  //  need to paginate this later =>

  const data = await newArrivalModel.find().sort({ createdAt: -1 });

  res.status(200).json({ status: true, data });
});
