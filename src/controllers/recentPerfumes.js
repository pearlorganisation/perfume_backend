import perfume from "../models/perfume.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllRecentPerfume = asyncHandler(async (req, res, next) => {
    const perfumeData = await perfume
    .find()
    .lean().select("perfume brand banner").sort({createdAt:-1}).limit(25);
  
    res.status(200).json({ status: true,message:"Recent Perfume Fetched Successfully !!", data: perfumeData });
  });





