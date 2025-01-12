import chalk from "chalk";
import { perfumeCategories as perfumeCategoriesModel } from "../models/perfumeCategories.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addPerfumeCategories = asyncHandler(async (req, res, next) => {
  const { perfumeName, links } = req?.body;
  const { perfumeId } = req.query;

  if (!perfumeId) {
    return res
      .status(500)
      .json({ status: false, message: "Missing Perfume ID" });
  }

  const allLinks = JSON?.parse(links) || [];
  // console.log(chalk.yellow(JSON?.stringify(allLinks)));

  if (allLinks.length < 1)
    return res.status(400).json({
      status: false,
      message: "Bad Request Wrong Input Values For Links !!",
    });
  const { banner } = req?.files;

  if (!perfumeName && !banner && !links) {
    res.status(500).json({ status: false, message: "Incomplete data" });
  }

  const map = new Map();

  allLinks.forEach((el) => {
    const { country, ...rest } = el;
    map.set(country, { ...rest });
  });

  const mapOfLinks = Object.fromEntries(map);

  const payload = {
    perfumeName,
    banner: banner[0]?.path,
    mapOfLinks,
    perfume: perfumeId,
  };

  const result = await perfumeCategoriesModel.create(payload);

  res
    .status(200)
    .json({ status: true, message: "Related Fragram Added", data: result });
});

export const getPerfumeCategories = asyncHandler(async (req, res, next) => {
  const { perfumeId } = req?.query;

  if (!perfumeId) {
    return res
      .status(500)
      .json({ status: false, message: "Missing Perfume ID" });
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

export const getSinglePerfumeCategories = asyncHandler(
  async (req, res, next) => {
    const { id } = req?.params;

    if (!id) {
      return res.status(500).json({ status: false, message: "Missing ID" });
    }

    const data = await perfumeCategoriesModel.findById(id);
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "No data found with given id!!",
      });
    }
    res.status(200).json({ status: true, data });
  }
);

export const updatePerfumeCategories = asyncHandler(async (req, res) => {
  const { perfumeName, links } = req?.body;
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ status: false, message: "Missing id" });
  }

  const allLinks = JSON?.parse(links) || [];
  if (allLinks.length < 1)
    return res.status(400).json({
      status: false,
      message: "Bad Request Wrong Input Values For Links !!",
    });

  const { banner } = req?.files;

  if (banner && banner?.length > 0) {
    payload.banner = banner[0]?.path;
  }
  const map = new Map();

  allLinks.forEach((el) => {
    const { country, ...rest } = el;
    map.set(country, { ...rest });
  });

  const mapOfLinks = Object.fromEntries(map);
  const payload = {
    perfumeName,
    mapOfLinks,
  };

  await perfumeCategoriesModel.findOneAndUpdate({ _id: id }, payload);
  res
    .status(200)
    .json({ status: true, message: "Related Fragram Updated successfully" });
});
