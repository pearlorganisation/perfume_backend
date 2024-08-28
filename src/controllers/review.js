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

export const updatePefumeReview = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;
  const { likes, disLikes } = req?.body;
  const existingPerfume = await reviews.findById(id);
  if (!existingPerfume) {
    return res
      .status(400)
      .json({ status: true, message: "No perfume data found with given id!!" });
  }

  const { notes, season, review, cons, pros } = req?.body;
  const { reviewGallery } = req?.files;

  const newReview = await reviews.findByIdAndUpdate(id, {
    ...req?.body,

    likes: likes ? existingPerfume?.likes,
    notes: notes ? JSON.parse(notes) : "",
    disLikes:disLikes ?existingPerfume?.disLikes++ ,
    pros: pros ? JSON.parse(pros) : "",
    cons: cons ? JSON.parse(cons) : "",
    season: season ? JSON.parse(season) : "",
    review: review
      ? review.push({ review: JSON.parse(review), gallery: reviewGallery })
      : "",
  });
});

export const singleReview = asyncHandler(async (req, res, next) => {
  const aggregationPipeline = [
    {
      $facet: {
        reaction: [
          { $match: { "reaction.name": { $ne: null } } },
          {
            $group: {
              _id: "$reaction.name",
              count: { $sum: 1 },
            },
          },
          {
            $group: {
              _id: null,
              result: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              reaction: { $arrayToObject: "$result" },
            },
          },
        ],
        season: [
          { $unwind: "$season" },
          { $match: { "season.name": { $ne: null } } },
          {
            $group: {
              _id: "$season.name",
              count: { $sum: 1 },
            },
          },
          {
            $group: {
              _id: null,
              result: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              season: { $arrayToObject: "$result" },
            },
          },
        ],
        priceValue: [
          { $match: { priceValue: { $ne: null } } },
          {
            $group: {
              _id: "$priceValue",
              count: { $sum: 1 },
            },
          },
          {
            $group: {
              _id: null,
              result: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              priceValue: { $arrayToObject: "$result" },
            },
          },
        ],
        gender: [
          { $match: { gender: { $ne: null } } },
          {
            $group: {
              _id: "$gender",
              count: { $sum: 1 },
            },
          },
          {
            $group: {
              _id: null,
              result: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              gender: { $arrayToObject: "$result" },
            },
          },
        ],
        sillage: [
          { $match: { sillage: { $ne: null } } },
          {
            $group: {
              _id: "$sillage",
              count: { $sum: 1 },
            },
          },
          {
            $group: {
              _id: null,
              result: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              sillage: { $arrayToObject: "$result" },
            },
          },
        ],
        longevity: [
          { $match: { longevity: { $ne: null } } },
          {
            $group: {
              _id: "$longevity",
              count: { $sum: 1 },
            },
          },
          {
            $group: {
              _id: null,
              result: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              longevity: { $arrayToObject: "$result" },
            },
          },
        ],
      },
    },
  ];

  const data = await reviews.aggregate(aggregationPipeline).exec();
  res.status(200).json({ status: true, data });
});
