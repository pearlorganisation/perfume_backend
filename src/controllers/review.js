import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import reviews from "../models/reviews.js";
import chalk from "chalk";

export const newPerfumeReview = asyncHandler(async (req, res, next) => {
  const {
    notes,
    season,
    reaction,
    commentsFields,
    sillage,
    longevity,
    gender,
    priceValue,
    reviewBy,
    perfumeId 
  } = req?.body;

  if(req.body.reviewBy)
  {
    const isReviewExists = await reviews.findOne({reviewBy:req?.body?.reviewBy,perfume:perfumeId}).lean();
    console.log(chalk.magenta("isReviewExists",JSON.stringify(req.body)));
   
    if(isReviewExists)
    {

      return res.status(400).json({status:false,message:"You have already given review on this Perfume !!"})
    }
  }

  let commentGallery = req?.files?.commentGallery;
  if (!commentGallery) {
    commentGallery = [];
  }
  const commentData = commentsFields ? JSON.parse(commentsFields) : {};
   

  const newReview = new reviews({
    perfume:perfumeId,
    reviewBy,
    notes: notes ? JSON.parse(notes) : [],
    season: season || "",
    longevity: longevity || "",
    sillage: sillage || "",
    gender: gender || "",
    priceValue: priceValue || "",
    reaction: reaction || "",
    commentsFields: commentData || [],
    commentGallery: commentGallery || [],
  });

  await newReview.save();

  if (!newReview) {
    res.status(400).json({
      status: false,
      message: "Bad Request ",
    });
  }

  res.status(201).json({
    status: true,
    message: "review submitted successfully",
  });
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

    likes: likes ? existingPerfume?.likes : 0,
    notes: notes ? JSON.parse(notes) : "",
    disLikes: disLikes ? existingPerfume?.disLikes + 1 : 0,
    pros: pros ? JSON.parse(pros) : "",
    cons: cons ? JSON.parse(cons) : "",
    season: season ? JSON.parse(season) : "",
    review: review
      ? review.push({ review: JSON.parse(review), gallery: reviewGallery })
      : "",
  });
});

// export const singleReview = asyncHandler(async (req, res, next) => {

//   const aggregationPipeline = [
//     {
//       $facet: {
//         reaction: [
//           { $match: { "reaction.name": { $ne: null } } },
//           {
//             $group: {
//               _id: "$reaction.name",
//               count: { $sum: 1 },
//             },
//           },
//           {
//             $group: {
//               _id: null,
//               result: {
//                 $push: {
//                   k: "$_id",
//                   v: "$count",
//                 },
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               reaction: { $arrayToObject: "$result" },
//             },
//           },
//         ],
//         season: [
//           { $unwind: "$season" },
//           { $match: { "season.name": { $ne: null } } },
//           {
//             $group: {
//               _id: "$season.name",
//               count: { $sum: 1 },
//             },
//           },
//           {
//             $group: {
//               _id: null,
//               result: {
//                 $push: {
//                   k: "$_id",
//                   v: "$count",
//                 },
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               season: { $arrayToObject: "$result" },
//             },
//           },
//         ],
//         priceValue: [
//           { $match: { priceValue: { $ne: null } } },
//           {
//             $group: {
//               _id: "$priceValue",
//               count: { $sum: 1 },
//             },
//           },
//           {
//             $group: {
//               _id: null,
//               result: {
//                 $push: {
//                   k: "$_id",
//                   v: "$count",
//                 },
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               priceValue: { $arrayToObject: "$result" },
//             },
//           },
//         ],
//         gender: [
//           { $match: { gender: { $ne: null } } },
//           {
//             $group: {
//               _id: "$gender",
//               count: { $sum: 1 },
//             },
//           },
//           {
//             $group: {
//               _id: null,
//               result: {
//                 $push: {
//                   k: "$_id",
//                   v: "$count",
//                 },
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               gender: { $arrayToObject: "$result" },
//             },
//           },
//         ],
//         sillage: [
//           { $match: { sillage: { $ne: null } } },
//           {
//             $group: {
//               _id: "$sillage",
//               count: { $sum: 1 },
//             },
//           },
//           {
//             $group: {
//               _id: null,
//               result: {
//                 $push: {
//                   k: "$_id",
//                   v: "$count",
//                 },
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               sillage: { $arrayToObject: "$result" },
//             },
//           },
//         ],
//         longevity: [
//           { $match: { longevity: { $ne: null } } },
//           {
//             $group: {
//               _id: "$longevity",
//               count: { $sum: 1 },
//             },
//           },
//           {
//             $group: {
//               _id: null,
//               result: {
//                 $push: {
//                   k: "$_id",
//                   v: "$count",
//                 },
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               longevity: { $arrayToObject: "$result" },
//             },
//           },
//         ],
//       },
//     },
//   ];

//   const data = await reviews.aggregate(aggregationPipeline).exec();
//   res.status(200).json({ status: true, data });
// });

export const getAllReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);

  // const data = await reviews.findMany({perfume:"66d2dd11dd2391f48772a570"}).lean();
  const data = await reviews.find({ perfume: id });
  console.log(data);
  res
    .status(200)
    .json({ status: true, message: "Reviews Fetched Successfully ", data });
});

export const getReviewByUserId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);

  // const data = await reviews.findMany({perfume:"66d2dd11dd2391f48772a570"}).lean();
  const data = await reviews
    .find({ reviewBy: id })
    .select(
      "-commentsFields -notes -productReviewCount -updatedAt -createdAt -commentGallery"
    )
    .lean();
  console.log(data);
  res
    .status(200)
    .json({ status: true, message: "Reviews Fetched Successfully ", data });
});
