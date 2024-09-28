import { asyncHandler } from "../utils/asyncHandler.js";
import celebrityPerfumesModel from "../models/celebrityPerfumes.js";

// get a all celebrity perfumes
export const getCelebrityPerfumes = asyncHandler(async (req, res) => {
  const limit = req?.query?.limit || 12;
  const page = req?.query?.page || 1;
  const skip = (page - 1) * limit;
  let totalPages = 0;

  const totalAttendees = await celebrityPerfumesModel.countDocuments();
  totalPages = Math.ceil(totalAttendees / limit);

  const result = await celebrityPerfumesModel.find().skip(skip).limit(limit);

  res.status(200).json({ status: true, totalPages, data: result });
});

// get a single celebrity perfume
export const getCelebrityPerfume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await celebrityPerfumesModel.findById(id);

  res.status(200).json({ status: true, data: result });
});

export const addCelebrityPerfume = asyncHandler(async (req, res) => {
  const { title, content } = req?.body;
  const { banner } = req?.files;

  if (!title && !content && !banner) {
    req
      .status(500)
      .json({ status: false, message: "Incomplete form parameters" });
  }
  const payload = {
    title: title,
    content: content,
    banner: banner[0]?.path,
  };

  console.log(payload);

  await celebrityPerfumesModel.create(payload);

  res
    .status(200)
    .json({ status: true, message: "Celebirty Perfume saved successfully" });
});

export const updateCelebrityPerfume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req?.body;

  if (!id && !title && !content) {
    res.status(500).json({ status: false, message: "Missing Parameters" });
  }

  const payload = {
    title: title,
    content: content,
  };
  const { banner } = req?.files;
  if (banner && banner?.length > 0) {
    payload.banner = banner[0]?.path;
  }

  await celebrityPerfumesModel.findOneAndUpdate({ _id: id }, payload);
  res
    .status(200)
    .json({ status: true, message: "Celebrity Perfume Updated successfully" });
});

export const deleteCelebrityPerfume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: false, message: "No id provided" });
  }
  const isIdValid = await celebrityPerfumesModel.findByIdAndDelete(id);
  if (!isIdValid) {
    return res.status(400).json({
      status: false,
      messaeg: "No celebrity perfume found with given id!!",
    });
  }

  res
    .status(200)
    .json({ status: true, message: "Celebrity Perfume deleted successfully" });
});
