import perfume from "../models/perfume.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllRecentPerfume = asyncHandler(async (req, res, next) => {

  // const start = performance.now();
  const perfumeData = await perfume
    .find()
    .populate({
      path: "brand",
      select: "brand",
    })
    .sort({ createdAt: -1 })
    .limit(25)
    .select("perfume banner slug")
    .lean()
    ;
    // const Problem = await perfume
    // .find()
    // .populate({
    //   path: "brand",
    //   select: "brand",
    // })
    // .sort({ createdAt: -1 })
    // .limit(25)
    // .select("perfume banner slug")
    // .explain("executionStats")
    // .lean()
    // const end = performance.now();
    
    // console.log("queryExplain",Problem)
    // console.log(`Time it is taking ${end - start}`)
  res
    .status(200)
    .json({
      status: true,
      message: "Recent Perfume Fetched Successfully !!",
      data: perfumeData,
    });
});
