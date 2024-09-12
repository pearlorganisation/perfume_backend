import { deleteFilesFromCloudinary } from "../config/cloudinary.js";
import { globalDataModel } from "../models/globalData.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addGlobalData = asyncHandler(async (req, res, next) => {
  const { itemType } = req?.body;
  const { file } = req?.files;

  if (!itemType && !file) {
    res.status(500).json({ status: false, message: "Incomplete data" });
  }

  const dataExist = await globalDataModel.findOne({ itemType: itemType });

  if (dataExist) {
    res.status(500).json({ status: false, message: "Banner already exists" });
  }

  const payload = {
    item: file[0],
    itemType: itemType,
  };

  console.log(payload);

  await globalDataModel.create(payload);
  const result = await globalDataModel.find({ itemType: itemType });

  res
    .status(200)
    .json({ status: true, message: "Global Item Added", data: result });
});

export const getGlobalData = asyncHandler(async (req, res, next) => {
  const { itemType } = req?.query;

  if (!itemType) {
    res.status(500).json({ status: false, message: "Missing Item Type" });
  }

  const data = await globalDataModel.find({ itemType: itemType });

  res.status(200).json({ status: true, data: data });
});

export const getSingleGlobalData = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing ID" });
  }

  const data = await globalDataModel.findById(id);

  res.status(200).json({ status: true, data: data });
});

export const deleteGlobalData = asyncHandler(async (req, res, next) => {
  const { fileName, id } = req?.query;

  if (!fileName && !id) {
    res.status(500).json({ status: false, message: "missing id/fileName" });
  }

  const fileResult = await deleteFilesFromCloudinary([fileName]);
  const isValidId = await globalDataModel.findByIdAndDelete(id);
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

export const updateGlobalData = asyncHandler(async (req, res) => {
  const { itemType } = req?.body;
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing id" });
  }

  const payload = {
    itemType,
  };

  const { file } = req?.files;

  if (file && file?.length > 0) {
    payload.item = file;
  }

  console.log(payload);

  await globalDataModel.findOneAndUpdate({ _id: id }, payload);
  res
    .status(200)
    .json({ status: true, message: "Global Data Updated successfully" });
});
