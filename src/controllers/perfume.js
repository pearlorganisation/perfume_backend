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

  const arr = JSON.parse(purchaseLinks);
  let map = new Map();

  for (let i = 0; i < arr.length; i++) {
    const currentItem = arr[i];

    if (map.has(currentItem.country)) {
      let prevCompanyData = map.get(currentItem.country);
      prevCompanyData.companiesList.push({
        company: currentItem.company,
        link: currentItem.link||'abhishek',
      });
      map.set(currentItem.country, prevCompanyData);
    } else {
      let companies = [];
      companies.push({
        company: currentItem.company,
        link: currentItem?.link||'abhishek',
      });
      map.set(currentItem.country, {  companiesList: companies });
    }
  }
  console.log("Map content before conversion:", Array.from(map.entries()));

  // Convert the Map to an object for MongoDB
  const mapsOfLinks = Object.fromEntries(map);
  
  console.log("Converted mapsOfLinks:", JSON.stringify(mapsOfLinks, null, 2));
  const newPerfume = new perfume({
    ...req?.body,
    banner: banner[0]?.path,
    gallery: gallery || [],
    pros: JSON.parse(pros),
    cons: JSON.parse(cons),
    logo: logo[0]?.path,
    mapOfLinks: (mapsOfLinks), // Set the converted object here
    purchaseLinks: JSON.parse(purchaseLinks),
    ratingFragrams: JSON.parse(ratingFragrams),
    mainAccords: JSON.parse(mainAccords),
    middleNote: JSON.parse(middleNote),
    topNote: JSON.parse(topNote),
    baseNote: JSON.parse(baseNote),
  });

  await newPerfume.save();

  console.log("Data for the pros cons");

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


// get male perfumes

export const getMalePerfumes = asyncHandler(async(req, res, next) => {
  const data = await perfume.find({"ratingFragrams.gender": "M"}).sort({createdAt:-1})
  res.status(200).json({status: true, data})
})

// get female perfumes

export const getFemalePerfumes = asyncHandler(async(req, res, next) => {
  const data = await perfume.find({"ratingFragrams.gender": "F"}).sort({createdAt:-1})
  res.status(200).json({status: true, data})
})