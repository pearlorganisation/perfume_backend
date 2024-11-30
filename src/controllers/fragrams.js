import chalk from "chalk";
import { fragrams as fragramsModel } from "../models/fragrams.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addFragram = asyncHandler(async (req, res, next) => {
  const { title, postBy, links, rating, perfumeId } = req?.body;

  if (!perfumeId) {
    res.status(500).json({ status: false, message: "Missing Perfume ID" });
  }

  const { banner } = req?.files;

  if (!title && !banner && !postBy && !rating && !links) {
    res.status(500).json({ status: false, message: "Incomplete data" });
  }
  const allLinks = JSON?.parse(links)||[{country:'IN',link:'something went wrong with url !!'}];
  
  const map = new Map();
  
  if(allLinks?.length < 1 )
    return res.status(400).json({status:false,message:'Please Do Provide At least One Link  in Fragrams !!'})

  allLinks.forEach(element => {
    map.set(element.country,element.link);
  
  });
   
  const mapOfLinks = Object.fromEntries(map);
  const payload = {
    title,
    banner: banner[0]?.path,
    postBy,
    mapOfLinks,
    rating,
    perfume: perfumeId,
  };

  const result =  await fragramsModel.create(payload);


  res
    .status(200)
    .json({ status: true, message: "Fragram Added", data: result });
});

export const getFragrams = asyncHandler(async (req, res, next) => {
  const { perfumeId } = req?.query;

  if (!perfumeId) {
    res.status(500).json({ status: false, message: "Missing Perfume ID" });
  }

  const fragramsData = await fragramsModel
    .find({ perfume: perfumeId })
    .populate({
      path: "perfume",
      as: "perfume",
      select: "perfume banner",
    })
    .sort({ createdAt: -1 });

  res.status(200).json({ status: true, data: fragramsData });
});

export const deleteFragram = asyncHandler(async (req, res, next) => {
  const isValidId = await fragramsModel.findByIdAndDelete(req?.params?.id);
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

export const getSingleFragram = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;

  if (!id) {
    req.status(500).json({ status: false, message: "Missing ID" });
  }

  const data = await fragramsModel.findById(id);
  if (!data) {
    return res.status(400).json({
      status: false,
      message: "No data found with given id!!",
    });
  }
  res.status(200).json({ status: true, data });
});

export const updateFragram = asyncHandler(async (req, res) => {
  const { title, postBy, rating, links } = req?.body;
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing id" });
  }

  const allLinks = JSON?.parse(links)||[{country:'IN',link:'something went wrong with url !!'}];
  
  const map = new Map();
  
  if(allLinks?.length < 1 )
    return res.status(400).json({status:false,message:'Please Do Provide At least One Link  in Fragrams !!'})

  allLinks.forEach(element => {
    map.set(element.country,element.link);
  
  });
   
  const mapOfLinks = Object.fromEntries(map);
  const payload = {
    title,
    banner: banner[0]?.path,
    postBy,
    mapOfLinks,
    rating,
    perfume: perfumeId,
  };
  const { banner } = req?.files;

  if (banner && banner?.length > 0) {
    payload.banner = banner[0]?.path;
  }

  console.log(payload);

  await fragramsModel.findOneAndUpdate({ _id: id }, payload);
  res
    .status(200)
    .json({ status: true, message: "Fragram Updated successfully" });
});
