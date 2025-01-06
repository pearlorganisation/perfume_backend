import chalk from "chalk";
import { contactUsModel } from "../models/contactUs.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Create a new contact us entry
export const createContactUs = asyncHandler(async (req, res) => {
    const { name, email, company, message } = req.body;

    // Validate input
    if (!name || !email || !company || !message) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Create and save the contact us entry
    const contactUsEntry = await contactUsModel.create({
        name,
        email,
        company,
        message,
    });

    console.log(chalk.bgYellow(JSON.stringify(contactUsEntry)));

    res.status(201).json({
        success: true,
        message: 'Contact us entry created successfully',
        data: contactUsEntry,
    });
});

// Get all contact us entries
export const getContactUsEntries = asyncHandler(async (req, res) => {
    const contactUsEntries = await contactUsModel.find();

    res.status(200).json({
        success: true,
        data: contactUsEntries,
    });
});

// Get a single contact us entry by ID
export const getContactUsById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contactUsEntry = await contactUsModel.findById(id);

    if (!contactUsEntry) {
        res.status(404);
        throw new Error('Contact us entry not found');
    }

    res.status(200).json({
        success: true,
        data: contactUsEntry,
    });
});

// Delete a contact us entry
export const deleteContactUs = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contactUsEntry = await contactUsModel.findByIdAndDelete(id);

    if (!contactUsEntry) {
        res.status(404);
        throw new Error('Contact us entry not found');
    }

    res.status(200).json({
        success: true,
        message: 'Contact us entry deleted successfully',
    });
});
