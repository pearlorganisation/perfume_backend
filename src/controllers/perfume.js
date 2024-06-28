import { asyncHandler } from "../utils/asyncHandler.js";
import perfume from "../models/perfume.js";
export const newPerfume = asyncHandler(async (req, res, next) => {
  const { gallery, banner } = req?.files;

  const { purchaseLinks, mainAccords, middleNote, topNote, baseNote } =
    req?.body;

  const newPerfume = new perfume({
    ...req?.body,
    banner: banner[0]?.path,
    gallery,
    purchaseLinks: JSON.parse(purchaseLinks),
    mainAccords: JSON.parse(mainAccords),
    middleNote: JSON.parse(middleNote),
    topNote: JSON.parse(topNote),
    baseNote: JSON.parse(baseNote),
  });
  await newPerfume.save();
  res
    .status(201)
    .json({ status: true, message: "New perfume created successfully!!" });
});

export const getAllPerfume = asyncHandler(async (req, res, next) => {
  const perfumeData = await perfume
    .find()
    .populate(["middleNote", "topNote", "baseNote"]);

  res.status(200).json({ status: true, data: perfumeData });
});

export const deletePerfume = asyncHandler(async (req, res, next) => {
  const isValidId = await perfume.findByIdAndDelete(req?.params?.id);
  if (!isValidId) {
    return res
      .status(400)
      .json({ status: true, message: "No data found with given id!!" });
  }
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});
