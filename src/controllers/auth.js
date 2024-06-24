import { asyncHandler } from "../utils/asyncHandler.js";
import auth from "../models/auth.js";
import errorResponse from "../utils/errorResponse.js";

export const signup = asyncHandler(async (req, res, next) => {
  const savedData = new auth(req?.body);
  await savedData.save();
  res
    .status(201)
    .json({ status: true, message: "New user created successfully!!" });
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
  res.status(200).json({ status: true, message: "signin successfully!!" });
});
