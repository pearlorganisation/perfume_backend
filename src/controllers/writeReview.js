// controllers/WriteReviewSchema.js
import { WriteReviewSchema } from "../models/writeReview.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new review request
export const createWriteReview = asyncHandler(async (req, res) => {
  const images = req?.files || [];
  const { description, userId, perfumeName } = req.body;

  if (description && userId && perfumeName) {
    const review = new WriteReviewSchema({
      description,
      perfumeName,
      userId,
      images,
    });
    await review.save();
    return res
      .status(201)
      .json({ status: true, message: "Data Created ", data: review });
  }

  res.status(400).json({ status: false, message: "Bad Request " });
});

// Get all review requests
export const getAllWriteReview = asyncHandler(async (req, res) => {
  const {Page,Limit,Search} = req.query;
  
  let page = 1;
  let limit = 10;
  let search = '';

  if(Page)
  {
    page = Math.max(page,Page);
  }
  if(Limit)
  {
    limit = Math.max(limit,Limit);
  }
  if(Search)
  {
    search = Search;
  }

  let skip = (page-1)*limit;

   const totalDocuments = await WriteReviewSchema.countDocuments( { perfumeName: { $regex: search, $options: 'i' } } );
   const totalPage = Math.ceil(totalDocuments / limit);
  const reviews = await WriteReviewSchema.find({ perfumeName: { $regex: search, $options: 'i' } }).populate("userId").skip(skip).limit(limit).sort({ createdAt: -1 }).lean();
  res.status(200).json({
    status: true,
    message: "Data Fetched Successfully ",
    data: reviews,
    totalDocuments,
    totalPage
  });
});

// Get a single review request by ID
export const getWriteReview = asyncHandler(async (req, res) => {
  const review = await WriteReviewSchema.findById(req.params.id)
    .populate("userId", "userName")
    .lean();
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.status(200).json(review);
});

// Update a review request by ID
export const updateWriteReview = asyncHandler(async (req, res) => {
  const review = await WriteReviewSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.status(200).json(review);
});

// Delete a review request by ID
export const deleteWriteReview = asyncHandler(async (req, res) => {
  const review = await WriteReviewSchema.findByIdAndDelete(req.params.id);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.status(200).json({ message: "Review deleted successfully" });
});
export const approveWriteReview = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const review = await WriteReviewSchema.findByIdAndUpdate(
    req.params.id,
    { status: status },
    { new: true, runValidators: true }
  );
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.status(200).json(review);
});
