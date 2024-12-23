import mongoose from "mongoose";
import { ProductReviewCount } from "../models/productReviewCount.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import chalk from "chalk";

// Controller for fetching review analytics
export const getReviewAnalytics = asyncHandler(async (req, res, next) => {
  // Simulate data retrieval from database or any service
  const analytics = await ProductReviewCount.aggregate([
    {
      $project: {
        reaction: {
          $sortArray: {
            input: {
              $objectToArray: "$reaction",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        gender: {
          $sortArray: {
            input: {
              $objectToArray: "$gender",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        sillage: {
          $sortArray: {
            input: {
              $objectToArray: "$sillage",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        season: {
          $sortArray: {
            input: {
              $objectToArray: "$season",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        priceValue: {
          $sortArray: {
            input: {
              $objectToArray: "$priceValue",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        longevity: {
          $sortArray: {
            input: {
              $objectToArray: "$longevity",
            },
            sortBy: {
              v: -1,
            },
          },
        },
      },
    },
    {
      $project: {
        reaction: {
          $arrayElemAt: ["$reaction", 0],
        },
        sillage: {
          $arrayElemAt: ["$sillage", 0],
        },
        season: {
          $arrayElemAt: ["$season", 0],
        },
        priceValue: {
          $arrayElemAt: ["$priceValue", 0],
        },
        longevity: {
          $arrayElemAt: ["$longevity", 0],
        },
        gender: {
          $arrayElemAt: ["$gender", 0],
        },
      },
    },
  ]);

  if (!analytics)
    res.status(400).json({
      success: false,
      message: "Perfume Data Not Found !!",
    });
  // Respond with the analytics data
  res.status(200).json({
    success: true,
    message: "Data Fetched Successfully !!",
    data: analytics,
  });
});
export const getReviewAnalyticsById = asyncHandler(async (req, res, next) => {
  // Extract parameters from the request if needed
  let { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Simulate data retrieval from database or any service
  const analytics = await ProductReviewCount.aggregate([
    {
      $match: { productId: new mongoose.Types.ObjectId(productId) },
    },
    {
      $project: {
        reaction: {
          $sortArray: {
            input: {
              $objectToArray: "$reaction",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        gender: {
          $sortArray: {
            input: {
              $objectToArray: "$gender",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        sillage: {
          $sortArray: {
            input: {
              $objectToArray: "$sillage",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        season: {
          $sortArray: {
            input: {
              $objectToArray: "$season",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        priceValue: {
          $sortArray: {
            input: {
              $objectToArray: "$priceValue",
            },
            sortBy: {
              v: -1,
            },
          },
        },
        longevity: {
          $sortArray: {
            input: {
              $objectToArray: "$longevity",
            },
            sortBy: {
              v: -1,
            },
          },
        },
      },
    },
    {
      $project: {
        reaction: {
          $arrayElemAt: ["$reaction", 0],
        },
        sillage: {
          $arrayElemAt: ["$sillage", 0],
        },
        season: {
          $arrayElemAt: ["$season", 0],
        },
        priceValue: {
          $arrayElemAt: ["$priceValue", 0],
        },
        longevity: {
          $arrayElemAt: ["$longevity", 0],
        },
        gender: {
          $arrayElemAt: ["$gender", 0],
        },
      },
    },
  ]);

  if (!analytics)
    res.status(400).json({
      success: false,
      message: "Perfume Data Not Found !!",
    });
  // Respond with the analytics data
  res.status(200).json({
    success: true,
    message: "Data Fetched Successfully !!",
    data: analytics?.length > 0 ? analytics[0] : null,
  });
});
