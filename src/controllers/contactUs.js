import chalk from "chalk";
import { contactUsModel } from "../models/contactUs.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new contact us entry
export const createContactUs = asyncHandler(async (req, res) => {
  const { name, email, company, message } = req.body;

  // Validate input
  if (!name || !email || !company || !message) {
    return res
      .status(400)
      .json({ status: false, message: "Please Provide All Inputs !!" });
    // throw new Error('All fields are required');
  }

  // Create and save the contact us entry
  const contactUsEntry = await contactUsModel.create({
    name,
    email,
    company,
    message,
  });

  res.status(201).json({
    status: true,
    message: "Contact us entry created statusfully",
    data: contactUsEntry,
  });
});

// Get all contact us entries
export const getContactUsEntries = asyncHandler(async (req, res) => {
  const contactUsEntries = await contactUsModel.find();

  res.status(200).json({
    status: true,
    data: contactUsEntries,
  });
});

// Get a single contact us entry by ID
export const getContactUsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contactUsEntry = await contactUsModel.findById(id);

  if (!contactUsEntry) {
    return res
      .status(404)
      .json({ status: false, message: "Contact us entry not found" });
  }

  res.status(200).json({
    status: true,
    data: contactUsEntry,
  });
});

// Delete a contact us entry
export const deleteContactUs = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contactUsEntry = await contactUsModel.findByIdAndDelete(id);

  if (!contactUsEntry) {
    return res
      .status(404)
      .json({ status: false, message: "Contact us entry not found" });
  }

  res.status(200).json({
    status: true,
    message: "Contact us entry deleted statusfully",
  });
});
