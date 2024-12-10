import OtherRelatedPerfume from "../models/otherPerfume.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

export const createOtherRelatedPerfume = asyncHandler(
  async (req, res, next) => {
    const { title, price, pricePerMl } = req.body;
    console.log(req.file);
    if (!title || !price || !pricePerMl) {
      return next(new errorResponse("All fields are required", 400));
    }

    // Create a new perfume
    const newPerfume = await OtherRelatedPerfume.create({
      title,
      image: req.file.path || "",
      price,
      pricePerMl,
      brandId: req.params?.id,
    });

    res.status(201).json({
      success: true,
      data: newPerfume,
    });
  }
);

export const getAllOtherRelatedPerfumes = asyncHandler(
  async (req, res, next) => {
    console.log(req.params.id);

    if (!req.params.id) {
      return next(new errorResponse("Provide valide id", 404));
    }

    const perfumes = await OtherRelatedPerfume.find({
      brandId: req.params.id,
    })
      .lean()
      .sort({ createdAt: 1 }); // Populating brand info if needed

    if (!perfumes || perfumes.length === 0) {
      return next(new errorResponse("Other related perfume not found"));
    }
    res.status(200).json({
      success: true,
      message: "All other relared perfume find",
      data: perfumes,
    });
  }
);
