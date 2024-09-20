import { asyncHandler } from "../utils/asyncHandler.js";
import perfumeModel from "../models/perfume.js";
import { ProductReviewCount } from "../models/productReviewCount.js";
import { upload2 } from "../config/multer2.js";
import { uploadFile } from "../config/cloudinary2.js";
export const newPerfume = asyncHandler(async (req, res, next) => {
  const { gallery, banner, logo, video } = req?.files;

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
        link: currentItem.link || "abhishek",
      });
      map.set(currentItem.country, prevCompanyData);
    } else {
      let companies = [];
      companies.push({
        company: currentItem.company,
        link: currentItem?.link || "abhishek",
      });
      map.set(currentItem.country, { companiesList: companies });
    }
  }
  console.log("Map content before conversion:", Array.from(map.entries()));

  // Convert the Map to an object for MongoDB
  const mapsOfLinks = Object.fromEntries(map);

  console.log("Converted mapsOfLinks:", JSON.stringify(mapsOfLinks, null, 2));
  const newPerfume = new perfumeModel({
    ...req?.body,
    banner: banner[0]?.path,
    video: video?.length ? video[0] : [],
    gallery: gallery || [],
    pros: JSON.parse(pros),
    cons: JSON.parse(cons),
    logo: logo[0]?.path,
    mapOfLinks: mapsOfLinks, // Set the converted object here
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

export const updatePerfume = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  console.log("assdas", req?.files);
  const { gallery, banner, logo, video } = req?.files;

  let query = {};

  if (gallery && gallery.length > 0) {
    const gall = await uploadFile(gallery);

    console.log("we came here");
    query.gallery = gall.result;
  }

  if (banner && banner.length > 0) {
    const bann = await uploadFile(banner);
    console.log("we came here bann", bann);

    query.banner = bann.result[0].url;
  }
  if (logo && logo.length > 0) {
    const log = await uploadFile(logo);

    console.log("we came here", log);
    query.logo = log.result[0].url;
  }

  if (video && video.length > 0) {
    const vid = await uploadFile(video);

    console.log("we came here");
    query.video = vid.result;
  }

  const {
    perfume,
    details,
    description,
    brand,
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
        link: currentItem.link || "abhishek",
      });
      map.set(currentItem.country, prevCompanyData);
    } else {
      let companies = [];
      companies.push({
        company: currentItem.company,
        link: currentItem?.link || "abhishek",
      });
      map.set(currentItem.country, { companiesList: companies });
    }
  }
  console.log("Map content before conversion:", Array.from(map.entries()));

  // Convert the Map to an object for MongoDB
  const mapsOfLinks = Object.fromEntries(map);

  console.log("Converted mapsOfLinks:", JSON.stringify(mapsOfLinks, null, 2));

  query.mapOfLinks = mapsOfLinks;
  query.purchaseLinks = JSON.parse(purchaseLinks);
  query.ratingFragrams = JSON.parse(ratingFragrams);
  query.middleNote = JSON.parse(middleNote);
  query.topNote = JSON.parse(topNote);
  query.middleNote = JSON.parse(middleNote);
  query.baseNote = JSON.parse(baseNote);
  query.mainAccords = JSON.parse(mainAccords);
  query.pros = JSON.parse(pros);
  query.cons = JSON.parse(cons);
  query.detail = details;
  query.description = description;
  query.perfume = perfume;
  query.brand = brand;

  console.log("dsfsdf", query);

  const updatedPerfume = await perfumeModel.findByIdAndUpdate(id, { ...query });

  // await newPerfume.save();

  console.log("Data for the pros cons");

  res.status(200).json({
    status: true,
    message: "Perfume Updated Successfully",
    data: updatedPerfume,
  });
});

export const getAllPerfume = asyncHandler(async (req, res, next) => {
  const perfumeData = await perfumeModel
    .find()
    .populate(["middleNote", "topNote", "baseNote", "brand"])
    .lean()
    .sort({ createdAt: -1 })
    .limit(50);

  res.status(200).json({ status: true, data: perfumeData });
});

export const deletePerfume = asyncHandler(async (req, res, next) => {
  const isValidId = await perfumeModel.findByIdAndDelete(req?.params?.id);
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
  const data = await perfumeModel
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
  const data = await perfumeModel
    .find()
    .lean()
    .sort({ createdAt: -1 })
    .select("perfume description reviewBy ");

  res.status(200).json({ status: true, data });
});

// get male perfumes

export const getMalePerfumes = asyncHandler(async (req, res, next) => {
  const data = await perfumeModel
    .find({ "ratingFragrams.gender": "M" })
    .sort({ createdAt: -1 });
  res.status(200).json({ status: true, data });
});

// get female perfumes

export const getFemalePerfumes = asyncHandler(async (req, res, next) => {
  const data = await perfumeModel
    .find({ "ratingFragrams.gender": "F" })
    .sort({ createdAt: -1 });
  res.status(200).json({ status: true, data });
});
