import { asyncHandler } from "../utils/asyncHandler.js";
import notes from "../models/notes.js";
import mongoose from "mongoose";

export const newNote = asyncHandler(async (req, res, next) => {
  const { name } = req?.body;
  const note = new notes({ name, image: req?.file?.path });
  await note.save();
  res
    .status(201)
    .json({ status: true, message: "Created successfully!!", note });
});

export const getAllNote = asyncHandler(async (req, res, next) => {
  const { Limit, Page, Search } = req.query;
  let page = 1; // Default to page 1
  let limit = 10; // Default to 10 results
  let search = ''; // Default to an empty search string

  if (Page) {
    page = Math.max(1, JSON.parse(Page)); // Ensure page is at least 1
  }
  
  if (Limit) {
    limit = Math.max(1, JSON.parse(Limit)); // Ensure limit is at least 1
  }

  if (Search) {
    search = Search;
  }

  // Calculate skip value
  const skip = (page - 1) * limit;

  // Count total documents matching the search query
  const totalDocuments = await notes.countDocuments({ name: { $regex: search, $options: 'i' } });
  const totalPage = Math.ceil(totalDocuments / limit);

  // Ensure page does not exceed total pages
  if (page > totalPage && totalPage > 0) {
    return res.status(200).json({
      status: true,
      message: "Data Fetched Successfully",
      totalDocuments,
      totalPage,
      data: [] // Return empty data if page exceeds total pages
    });
  }

  // Fetch the data
  const data = await notes
    .find({ name: { $regex: search, $options: 'i' } })
    .skip(skip)
    .limit(limit)
    .lean();

  // Send response
  res.status(200).json({
    status: true,
    message: "Data Fetched Successfully",
    totalDocuments,
    totalPage,
    data
  });
});


export const deleteNote = asyncHandler(async (req, res, next) => {
  const isIdValid = await notes.findByIdAndDelete(req?.params?.id);
  if (!isIdValid) {
    return res
      .status(400)
      .json({ status: false, messaeg: "No note found with given id!!" });
  }
  const data = await notes.find();

  res
    .status(200)
    .json({ status: true, message: "Note deleted successfully!!", data: data });
});
