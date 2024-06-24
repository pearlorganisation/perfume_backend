import express from "express";
import { upload } from "../config/cloudinary.js";
import { getAllPerfume, newPerfume } from "../controllers/perfume.js";
const router = express.Router();

router.route("/").post(upload.fields([]), newPerfume).get(getAllPerfume);
export default router;
