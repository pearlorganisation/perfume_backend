import chalk from "chalk";
import perfume from "../models/perfume.js";
import { redisClient } from "../Redis/Redis.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllRecentPerfume = asyncHandler(async (req, res, next) => {
  const cacheKey = "recentPerfumes";
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return res.status(200).json({
      status: true,
      message: "Recent Perfume Fetched Successfully !!",
      data: JSON.parse(cachedData),
    });
  } else {
    console.log(chalk.red("Cache Miss !!"));

    const perfumeData = await perfume
      .find()
      .populate({
        path: "brand",
        select: "brand",
      })
      .select("perfume banner slug")
      .sort({ createdAt: -1 })
      .limit(25)
      .lean();
    await redisClient.setEx(cacheKey, 900, JSON.stringify(perfumeData));

    res.status(200).json({
      status: true,
      message: "Recent Perfume Fetched Successfully !!",
      data: perfumeData,
    });
  }
});
