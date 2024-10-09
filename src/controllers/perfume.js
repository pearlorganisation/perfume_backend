import { asyncHandler } from "../utils/asyncHandler.js";
import perfumeModel from "../models/perfume.js";
import { ProductReviewCount } from "../models/productReviewCount.js";
import { upload2 } from "../config/multer2.js";
import { uploadFile } from "../config/cloudinary2.js";
export const newPerfume = asyncHandler(async (req, res, next) => {
  const { gallery, banner, logo, video } = req?.files;

  console.log("gallery", gallery);

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

  const { gallery, banner, logo, video } = req?.files;

  let query = {};

  if (gallery && gallery.length > 0) {
    const gall = await uploadFile(gallery);
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

    console.log("we came here", vid);
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

  const updatedPerfume = await perfumeModel.findByIdAndUpdate(id, { ...query });

  console.log("query", query);

  res.status(200).json({
    status: true,
    message: "Perfume Updated Successfully",
    data: updatedPerfume,
  });
});

export const getAllPerfume = asyncHandler(async (req, res, next) => {
  const { Page, Limit, Search } = req.query;
  console.log("req.query", req.query);
  let page = 1;
  let limit = 10;
  let search = "";
  if (Page) {
    page = Math.max(page, Page);
  }
  if (Limit) {
    limit = Math.max(limit, Limit);
  }
  if (Search) {
    search = Search;
  }

  let skip = (page - 1) * limit;
  console.log(search, "asdsada");

  const totalDocuments = await perfumeModel.countDocuments({
    perfume: { $regex: search, $options: "i" },
  });
  const totalPage = Math.ceil(totalDocuments / limit);

  if (Limit === "infinite") {
    limit = totalDocuments;
  }
  const perfumeData = await perfumeModel
    .find({ perfume: { $regex: search, $options: "i" } })
    .populate(["middleNote", "topNote", "baseNote", "brand"])
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json({ status: true, data: perfumeData, totalDocuments, totalPage });
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
  const { Page, Limit, Search, Select } = req.query;

  let page = 1;
  let limit = 10;
  let search = "";
  let select = "";
  if (Page) {
    page = Math.max(page, Page);
  }
  if (Limit) {
    limit = Math.max(limit, Limit);
  }
  if (Search) {
    search = Search;
  }

  if (Select) {
    select = Select;
  }

  console.log("select", select);

  let skip = (page - 1) * limit;

  const totalDocuments = await perfumeModel.countDocuments({
    perfume: { $regex: search, $options: "i" },
    "ratingFragrams.gender": { $in: ["M", "O"] },
  });
  const totalPage = Math.ceil(totalDocuments / limit);

  if (Limit === "infinite") {
    limit = totalDocuments;
  }
  const data = await perfumeModel
    .find({
      perfume: { $regex: search, $options: "i" },
      "ratingFragrams.gender": { $in: ["M", "O"] },
    })
    .skip(skip)
    .limit(limit)
    .select(select)
    .sort({ createdAt: -1 })
    .lean();
  res.status(200).json({ status: true, data, totalPage, totalDocuments });
});

// get female perfumes

export const getFemalePerfumes = asyncHandler(async (req, res, next) => {
  const { Page, Limit, Search, Select } = req.query;

  let page = 1;
  let limit = 10;
  let search = "";
  let select = "";
  if (Page) {
    page = Math.max(page, Page);
  }
  if (Limit) {
    limit = Math.max(limit, Limit);
  }
  if (Search) {
    search = Search;
  }

  if (Select) {
    select = Select;
  }

  console.log("select", select);

  let skip = (page - 1) * limit;

  const totalDocuments = await perfumeModel.countDocuments({
    perfume: { $regex: search, $options: "i" },
    "ratingFragrams.gender": { $in: ["F", "O"] },
  });
  const totalPage = Math.ceil(totalDocuments / limit);

  if (Limit === "infinite") {
    limit = totalDocuments;
  }
  const data = await perfumeModel
    .find({
      perfume: { $regex: search, $options: "i" },
      "ratingFragrams.gender": { $in: ["F", "O"] },
    })
    .skip(skip)
    .limit(limit)
    .select(select)
    .sort({ createdAt: -1 });
  res.status(200).json({ status: true, data, totalPage, totalDocuments });
});
