import express from "express";
import {
  approveWriteReview,
  createWriteReview,
  deleteWriteReview,
  getAllWriteReview,
  getWriteReview,
  updateWriteReview,
} from "../controllers/writeReview.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
router.patch("/status/:id", approveWriteReview);
router.post("/", upload.array("images"), createWriteReview);
router.get("/", getAllWriteReview);
router.get("/:id", getWriteReview);
router.put("/:id", updateWriteReview);
router.delete("/:id", deleteWriteReview);

export const writeReviewRouter = router;
