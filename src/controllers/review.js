import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import reviews from "../models/reviews.js";

export const newPerfumeReview = asyncHandler(async (req, res, next) => {
  const { notes, season, review, cons, pros } = req?.body;
  const { reviewGallery } = req?.files

  const newReview = new review({
    ...req?.body,
    notes: notes ? JSON.parse(notes) : "",
    pros: pros ? JSON.parse(pros) : "",
    cons: cons ? JSON.parse(cons) : "",
    season: season ? JSON.parse(season) : "",
    review: review ? review.push({ review: JSON.parse(review), gallery: reviewGallery }) : ""



  });
  res.status(201).json({ status: true, message: "review submitted successfully" })
});
