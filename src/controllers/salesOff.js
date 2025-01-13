import chalk from "chalk";
import { salesOffModel } from "../models/salesOff.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @desc Create a new Sales Off record
 * @route POST /api/sales-off
 */
export const createSalesOff = asyncHandler(async (req, res) => {
  let { title, links, rating } = req.body;

  links = JSON.parse(links);
  const banner = req?.file?.path;

  const map = new Map();
  links.forEach((element) => {
    map.set(element.country, {
      price: element?.price || "100$",
      link: element?.link || "https://learn.onemonth.com/what-is-a-404-page/",
      quantity: el?.quantity || "400 ML",
    });
  });
  const mapOfLinks = Object.fromEntries(map);

  const numOfData = await salesOffModel.countDocuments();

  if (numOfData == 6) {
    return res.status(400).json({
      status: false,
      message: "Sales Off Section Can only hold up 6 products !!",
    });
  }

  const salesOff = await salesOffModel.create({
    title,
    mapOfLinks,
    rating,
    banner: banner || "",
  });

  res.status(201).json({
    success: true,
    data: salesOff,
    message: "Sales Off Created Successfully !!",
  });
});

/**
 * @desc Get all Sales Off records
 * @route GET /api/sales-off
 */
export const getSalesOffs = asyncHandler(async (req, res) => {
  const salesOffs = await salesOffModel
    .find()
    .select("title mapOfLinks rating banner")
    .lean();
  res.status(200).json({
    success: true,
    data: salesOffs,
    message: "Data Fetched Successfully !!",
  });
});

/**
 * @desc Get a single Sales Off record
 * @route GET /api/sales-off/:id
 */
export const getSalesOffById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const salesOff = await salesOffModel
    .findOne({ _id: id })
    .select("title mapOfLinks rating banner")
    .lean();

  if (!salesOff) {
    return (
      res.status(404),
      json({ status: false, message: "Sales Off record not found" })
    );
  }

  res.status(200).json({
    success: true,
    data: salesOff,
    message: "Data Fetched Successfully !!",
  });
});

/**
 * @desc Update a Sales Off record
 * @route PUT /api/sales-off/:id
 */
export const updateSalesOff = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedSalesOff = await salesOffModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedSalesOff) {
    return res
      .status(404)
      .json({ status: false, message: "Sales Off record not found" });
  }

  res.status(200).json({
    success: true,
    data: updatedSalesOff,
  });
});

/**
 * @desc Delete a Sales Off record
 * @route DELETE /api/sales-off/:id
 */
export const deleteSalesOff = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedSalesOff = await salesOffModel.findByIdAndDelete(id);

  if (!deletedSalesOff) {
    return res
      .status(404)
      .json({ status: false, message: "Sales Off record not found" });
  }

  res.status(200).json({
    success: true,
    message: "Sales Off record deleted successfully",
  });
});
