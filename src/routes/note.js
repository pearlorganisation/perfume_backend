import express from "express";
import { upload } from "../config/cloudinary.js";
import { deleteNote, getAllNote, newNote } from "../controllers/notes.js";
const router = express.Router();

router.route("/").get(getAllNote).post(upload.single("image"), newNote);

router.route("/:id").delete(deleteNote);

export default router;
