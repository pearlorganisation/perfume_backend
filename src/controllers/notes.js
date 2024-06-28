import { asyncHandler } from "../utils/asyncHandler.js";
import notes from "../models/notes.js";
import mongoose from "mongoose";

export const newNote = asyncHandler(async (req, res, next) => {
  const { name } = req?.body;
  const note = new notes({ name, image: req?.file?.path });
  await note.save();
  res.status(201).json({ status: true, message: "Created successfully!!" });
});

export const getAllNote = asyncHandler(async (req, res, next) => {
  const data = await notes.find();
  res.status(200).json({ status: true, data });
});

export const deleteNote = asyncHandler(async (req, res, next) => {
  const isIdValid = await notes.findByIdAndDelete(req?.params?.id);
  if (!isIdValid) {
    return res
      .status(400)
      .json({ status: false, messaeg: "No note found with given id!!" });
  }
  res
    .status(200)
    .json({ status: true, message: "Note deleted successfully!!" });
});
