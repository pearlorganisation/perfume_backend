import mongoose from "mongoose";
import auth from "../models/auth.js";
import { Comments } from "../models/comments.js";
import perfume from "../models/perfume.js";
import { userGlobalCountModel } from "../models/userGlobalCounts.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import chalk from "chalk";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { id: perfumeId } = req.params;
    const { description, userId } = req.body;
    const gallery = req?.files;

    let commentImages = gallery || [];

    const isPerfumeValid = await perfume.findById(perfumeId);
    let isUser = await auth.findById(userId).lean();

    if (!isUser) {
     res.status(400).json({status:false,message:"Something Went Wrong Try Again !!"});
    }

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
  const { id } = req.params;
  
  console.log(chalk.green(JSON.stringify(req.body)))
  const comment = await Comments.findOne({_id: id }).select('likes disLikes');

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
export const voteComment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    let {userId,perfumeId,vote} = req.body;
    vote = parseInt(vote)||0;
    
    const comment = await Comments.findOne({_id:id}).session(session);
    const currUser = await userGlobalCountModel.findOne({userId}).session(session);

    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    if (!currUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
   
    const currCommentMetData = currUser.commentsVote.find((el=>  el.commentId == id));
    
    console.log(chalk.yellow(JSON.stringify(currUser.commentsVote)));
    if(!currCommentMetData)
    {
      currUser.commentsVote.push({
        commentId:id,perfumeId,vote
      });

      if(vote === -1)
      {
        comment.disLikes += 1;
      }
      else
      {
        console.log(chalk.red("im coming here"));
        comment.likes += 1;
        
      }
    }
    else
    {
      if(currCommentMetData.vote === vote)
      {
        currCommentMetData.vote = 0;
        if(vote === -1)
        {
          comment.disLikes -=1;
        }
        else if(vote === 1){
          comment.likes -=1;

        }
      }
      else{
        
      if(currCommentMetData.vote === 0)
      {
          if(vote === -1)
          {
            comment.disLikes += 1;
          }
          else if (vote === 1)
          {
            comment.likes += 1;
          }
          currCommentMetData.vote = vote;
      }
      else
      {
        if(vote === -1)
          {
           comment.disLikes += 1;
           comment.likes -=1;
          }
          else if(vote === 1){
           comment.likes += 1;
           comment.disLikes -= 1;
   
          }
          currCommentMetData.vote = vote;

      }
       
   

      }
    }
   

   console.log(await currUser.save());
   console.log(await comment.save());
   await session.commitTransaction(); 

    res
      .status(200)
      .json({ success: true, message: "Comment Updated successfully" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, message: error.message });
  }finally{
    session.endSession();

  }
};
