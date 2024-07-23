import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import reviews from "../models/reviews.js";

export const newPerfumeReview = asyncHandler(async (req, res, next) => {
  const { notes, season, review, cons, pros } = req?.body;
  const { reviewGallery } = req?.files;

  const newReview = new review({
    ...req?.body,
    notes: notes ? JSON.parse(notes) : "",
    pros: pros ? JSON.parse(pros) : "",
    cons: cons ? JSON.parse(cons) : "",
    season: season ? JSON.parse(season) : "",
    review: review
      ? review.push({ review: JSON.parse(review), gallery: reviewGallery })
      : "",
  });

  res
    .status(201)
    .json({ status: true, message: "review submitted successfully" });
});

export const singleReview = asyncHandler(async (req, res, next) => {
  const total = await reviews.countDocuments();
  const data = await reviews.findById(req?.params?.id);
  if (!data) {
    return next(new errorResponse("No data found with given id!", 400));
  }
  console.log(data, total);
  res.status(200).json({ status: true, data });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const total = await reviews.countDocuments();
  const data = await reviews.findById(req?.params?.id);
  console.log(data, "hello data");
});
