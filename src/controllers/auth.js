import { asyncHandler } from "../utils/asyncHandler.js";
import auth from "../models/auth.js";
import errorResponse from "../utils/errorResponse.js";

export const signup = asyncHandler(async (req, res, next) => {
  const savedData = new auth(req?.body);
  console.log(req?.body)
  await savedData.save();
  res
    .status(201)
    .json({ success: true, message: "New user created successfully!!" });
});

export const signin = asyncHandler(async (req, res, next) => {
  const { userName, pin } = req?.body;
  const isUserValid = await auth.findOne({ userName });
  if (!isUserValid) {
    return next(new errorResponse("No user found with given username!!", 400));
  }
  if (pin != isUserValid?.pin) {
    return next(new errorResponse("Invalid pin,Please try again!!", 400));
  }
  res.status(200).json({data:isUserValid, status: true, message: "signin successfully!!" });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const {Page,Limit,Search} = req.params;

  let page = 1;
  let limit = 10;
  let search = '';

  if (Page) {
    page = Math.max(1, JSON.parse(Page)); // Ensure page is at least 1
  }
  
  if (Limit) {
    limit = Math.max(1, JSON.parse(Limit)); // Ensure limit is at least 1
  }

  if (Search) {
    search = Search;
  }

  const skip = (page - 1)*limit;
  
  const totalUsersCount = await auth.countDocuments().lean();
  
  
  const allUsers = await auth.find({ userName: { $regex: search, $options: 'i' } }).skip(skip).limit(10).lean();
  res.status(200).json({totalUsers:totalUsersCount,totalPage :Math.ceil(totalUsersCount/limit) ,data:allUsers, status: true, message: "Success Fetched!!" });
});
