import { perfumeCategories as perfumeCategoriesModel } from "../models/perfumeCategories.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addPerfumeCategories = asyncHandler(async (req, res, next) => {
  const { perfumeName, price, priceMl,link, perfumeId } = req?.body;

  if (!perfumeId) {
    res.status(500).json({ status: false, message: "Missing Perfume ID" });
  }

  const { banner } = req?.files;

  if (!perfumeName && !banner && !price && !priceMl && !link) {
    res.status(500).json({ status: false, message: "Incomplete data" });
  }

  const payload = {
    perfumeName,
    banner: banner[0]?.path,
    price,
    priceMl,
    link,
    perfume: perfumeId,
  };

  await perfumeCategoriesModel.create(payload);

  const result = await perfumeCategoriesModel.find({ perfume: perfumeId });

  res
    .status(200)
    .json({ status: true, message: "Related Fragram Added", data: result });
});

export const getPerfumeCategories = asyncHandler(async (req, res, next) => {
  const { perfumeId } = req?.query;

  if (!perfumeId) {
    res.status(500).json({ status: false, message: "Missing Perfume ID" });
  }

  const perfumeCategoriesData = await perfumeCategoriesModel
    .find({ perfume: perfumeId })
    .populate({
      path: "perfume",
      as: "perfume",
      select: "perfume banner",
    })
    .sort({ createdAt: -1 });

  res.status(200).json({ status: true, data: perfumeCategoriesData });
});

export const deletePerfumeCategories = asyncHandler(async (req, res, next) => {
  const isValidId = await perfumeCategoriesModel.findByIdAndDelete(
    req?.params?.id
  );
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

export const getSinglePerfumeCategories = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;

  if (!id) {
    req.status(500).json({ status: false, message: "Missing ID" });
  }

  const data = await perfumeCategoriesModel.findById(id);
  if (!data) {
    return res.status(400).json({
      status: false,
      message: "No data found with given id!!",
    });
  }
  res.status(200).json({ status: true, data });
});

export const updatePerfumeCategories = asyncHandler(async (req, res) => {
  
  const { perfumeName, price, priceMl, link } = req?.body;
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing id" });
  }

  const payload = {
    perfumeName,
    link,
    price,
    priceMl
  };

  const { banner } = req?.files;

  if (banner && banner?.length > 0) {
    payload.banner = banner[0]?.path;
  }

  console.log(payload)

  await perfumeCategoriesModel.findOneAndUpdate({ _id: id }, payload);
  res
    .status(200)
    .json({ status: true, message: "Related Fragram Updated successfully" });
});
