import { asyncHandler } from "../utils/asyncHandler.js";
import perfume from "../models/perfume.js";
import { ProductReviewCount } from "../models/productReviewCount.js";
export const newPerfume = asyncHandler(async (req, res, next) => {
  const { gallery, banner, logo } = req?.files;

  const {
    purchaseLinks,
    mainAccords,
    middleNote,
    topNote,
    baseNote,
    ratingFragrams,
    pros,
    cons,
  } = req?.body;

  const newPerfume = new perfume({
    ...req?.body,
    banner: banner[0]?.path,
    gallery:gallery||[],
    pros: JSON.parse(pros),
    cons: JSON.parse(cons),
    logo: logo[0].path,
    purchaseLinks: JSON.parse(purchaseLinks),
    ratingFragrams: JSON.parse(ratingFragrams),
    mainAccords: JSON.parse(mainAccords),
    middleNote: JSON.parse(middleNote),
    topNote: JSON.parse(topNote),
    baseNote: JSON.parse(baseNote),
  });
  await newPerfume.save();


  // const dataForProsCons = await perfume({
  //   $match:{
  //     _id:newPerfume._id,
  //     perfume:newPerfume.perfume
  //   }
  // });



  // const prosConsData = ProsCons.create({
  //   perfumeId:newPerfume._id
  // })
  
  console.log("Data for the pros cons ")

  res.status(201).json({ status: true, newPerfume });
});

export const getAllPerfume = asyncHandler(async (req, res, next) => {
  const perfumeData = await perfume
    .find()
    .populate(["middleNote", "topNote", "baseNote"]).lean().sort({createdAt:-1}).limit(50);

  res.status(200).json({ status: true, data: perfumeData });
});

export const deletePerfume = asyncHandler(async (req, res, next) => {
  const isValidId = await perfume.findByIdAndDelete(req?.params?.id);
  if (!isValidId) {
    return res
      .status(400)
      .json({ status: true, message: "No data found with given id!!" });
  }

  //get all perfume data
  // const perfumeData = await perfume
  //   .find()
  //   .populate(["middleNote", "topNote", "baseNote"]);

  // const deleteReviewCounts = await ProductReviewCount.findByIdAndDelete(
  //   isValidId.productReviewCoundId
  // );


  // console.log(
  //   "THIS is deleted review count ",
  //   deleteReviewCounts,
  //   "gjsgdjsa",
  //   isValidId
  // );

  res.status(200).json({
    status: true,
    message: "Deleted successfully!!",
  });
});

export const getSinglePerfume = asyncHandler(async (req, res, next) => {
  const data = await perfume
    .findById(req?.params?.id)
    .populate(["middleNote", "topNote", "baseNote"]);
  if (!data) {
    return res.status(400).json({
      status: false,
      message: "No perfume data found with given id!!",
    });
  }

  res.status(200).json({ status: true, data });
});


export const getPerfumeReview = asyncHandler(async (req, res, next) => {
  const data = await perfume
    .find().lean().sort({createdAt:-1}).select("perfume description reviewBy ")
 
  res.status(200).json({ status: true, data });
});
