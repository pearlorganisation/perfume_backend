import perfume from "../models/perfume.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllRecentPerfume = asyncHandler(async (req, res, next) => {
    const {id} = req.params; 
    const perfumeData = await perfume
    .find({brand:id})
    .lean().select("perfume brand banner").sort({createdAt:-1}).limit(50);
  
    res.status(200).json({ status: true,message:"Recent Perfume Fetched Successfully !!", data: perfumeData });
  });





  