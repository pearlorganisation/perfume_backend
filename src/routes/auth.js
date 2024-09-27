import express from "express";
import { upload } from "../config/cloudinary.js";
import { signin, signup, getAllUsers } from "../controllers/auth.js";
import { getUserGlobalCount } from "../controllers/userGlobalCount.js";
const router = express.Router();

router.route("/signin").post(signin);
router.route("/userHistory/:id").get(getUserGlobalCount);
router.route("/signup").post(signup);
router.route("/").get(getAllUsers);
export default router;
