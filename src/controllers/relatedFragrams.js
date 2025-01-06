import chalk from "chalk";
import { NewArrivalPerfume as newArrivalModel } from "../models/newArrival.js";
import { relatedFragrams as relatedFragramsModel } from "../models/relatedFragrams.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addRelatedFragram = asyncHandler(async (req, res, next) => {
  const { perfumeName, brand, links, perfumeId } = req?.body;

  if (!perfumeId) {
    res.status(500).json({ status: false, message: "Missing Perfume ID" });
  }

  const { banner } = req?.files;

  if (!perfumeName && !banner && !brand && !links) {
    res.status(500).json({ status: false, message: "Incomplete data" });
  }

  const allLinks = JSON.parse(links)||[];

  console.log(chalk.red(JSON.stringify(allLinks)));

  if(allLinks?.length < 1)
    {
     return res.status(400).json({status:false,message:"Give At Least One Link For Related Fragram !!"});
    }
  const map = new Map(); 

  allLinks.forEach((el)=>{
   map.set(el.country,el.link);
  })
 
   const mapOfLinks = Object.fromEntries(map);


  const payload = {
    perfumeName,
    banner: banner[0]?.path,
    brand,
    mapOfLinks,
    perfume: perfumeId,
  };

 const result =   await relatedFragramsModel.create(payload);


  res
    .status(200)
    .json({ status: true, message: "Related Fragram Added", data: result });
});

export const getRelatedFragrams = asyncHandler(async (req, res, next) => {
  const { perfumeId } = req?.query;

  if (!perfumeId) {
    res.status(500).json({ status: false, message: "Missing Perfume ID" });
  }

  const relatedFragramsData = await relatedFragramsModel
    .find({ perfume: perfumeId })
    .populate({
      path: "perfume",
      as: "perfume",
      select: "perfume banner slug",
    })
    .populate("brand")
    .sort({ createdAt: -1 });

  res.status(200).json({ status: true, data: relatedFragramsData });
});

export const deleteRelatedFragram = asyncHandler(async (req, res, next) => {
  const isValidId = await relatedFragramsModel.findByIdAndDelete(
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

export const getSingleRelatedFragram = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;

  if (!id) {
    req.status(500).json({ status: false, message: "Missing ID" });
  }

  const data = await relatedFragramsModel.findById(id);
  if (!data) {
    return res.status(400).json({
      status: false,
      message: "No data found with given id!!",
    });
  }
  res.status(200).json({ status: true, data });
});

export const updateRelatedFragram = asyncHandler(async (req, res) => {
  const { perfumeName, brand, links } = req?.body;
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing id" });
  }

  const allLinks = JSON?.parse(links)||[];

   if(allLinks?.length < 1)
   {
    return res.status(400).json({status:false,message:"Give At Least One Link For Related Fragram !!"});
   }
  const map = new Map(); 
  
  allLinks.forEach((el)=>{
   map.set(el.country,el.link);
  })
 
  const mapOfLinks = Object.fromEntries(map);


  const payload = {
    perfumeName,
    banner: banner[0]?.path,
    brand,
    mapOfLinks,
    perfume: perfumeId,
  };


  const { banner } = req?.files;

  if (banner && banner?.length > 0) {
    payload.banner = banner[0]?.path;
  }

  console.log(payload);

  await relatedFragramsModel.findOneAndUpdate({ _id: id }, payload);
  res
    .status(200)
    .json({ status: true, message: "Related Fragram Updated successfully" });
});
