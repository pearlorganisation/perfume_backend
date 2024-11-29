import auth from "../models/auth.js";
import { Comments } from "../models/comments.js";
import perfume from "../models/perfume.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { id: perfumeId } = req.params;
    const { description, userId } = req.body;
    const gallery = req?.files;
    console.log(req.files, "sh");

    let commentImages = gallery || [];

    const isPerfumeValid = await perfume.findById(perfumeId);
    let isUser = await auth.findById(userId).lean();

    if (!isUser) {
      isUser = "Defaul User";
    }
    console.log("user id ", isUser);

    if (!isPerfumeValid) {
      return res
        .status(400)
        .json({ success: false, message: "Provide a valid Perfume ID!" });
    }

    const comment = new Comments({
      title: isUser.userName,
      perfumeId,
      userId,
      commentGallery: commentImages || [],
      description,
    });
    await comment.save();

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    // Handle errors and return a 500 status code for server errors
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all comments as per perfumeId
export const getComments = asyncHandler(async (req, res) => {
  const comments = await Comments.find({}).populate(["userId"]).lean().sort({createdAt: -1}).select("logo title description userId perfumeId").limit(25);
  if (!comments) {
    res.status(400).json({ success: false, message: "Not found !!" });
  }
  res.status(200).json({
    success: true,
    message: "Comments Fetched Successfully!!",
    data: comments,
  });
});

// Get all comments as per perfumeId
export const getAllComments = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comments = await Comments.find({ perfumeId: id });
  if (!comments) {
    res.status(400).json({ success: false, message: "Not found !!" });
  }
  res.status(200).json({
    success: true,
    message: "Comments Fetched Successfully!!",
    data: comments,
  });
});

// Get a comment by ID
export const getCommentById = asyncHandler(async (req, res) => {
  const { perfumeId } = req.params;
  const { id } = req.body;

  const comment = await Comments.findMany({ perfumeId, _id: id });

  if (!comment)
    return res
      .status(404)
      .json({ success: false, message: "Comment not found" });
  res.status(200).json({ success: true, data: comment });
});

// Update a comment pending ---
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, perfumeId, images } = req.body;
    const comment = await Comments.findByIdAndUpdate(
      id,
      { title, perfumeId, images },
      { new: true, runValidators: true }
    );
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comments.findByIdAndDelete(id);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//like the comment
export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;


    const comment = await Comments.findByIdAndDelete(id);
    
    
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
