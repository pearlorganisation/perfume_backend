// Import necessary modules
import express from 'express';
import { createContactUs, deleteContactUs, getContactUsById, getContactUsEntries } from '../controllers/contactUs.js';


const router = express.Router();

// Route to create a new contact us entry
router.post('/', createContactUs);

// Route to get all contact us entries
router.get('/', getContactUsEntries);

// Route to get a single contact us entry by ID
router.get('/:id', getContactUsById);

// Route to delete a contact us entry by ID
router.delete('/:id', deleteContactUs);

export const contactUsRouter =  router;
