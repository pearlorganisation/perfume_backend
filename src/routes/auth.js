import express from "express";
import { upload } from "../config/cloudinary.js";
import { signin, signup } from "../controllers/auth.js";
const router = express.Router();

router.route("/signin").post(signin);
router.route("/signup").post(signup);
export default router;
