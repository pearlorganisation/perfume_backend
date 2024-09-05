import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  createComment,
  deleteComment,
  getAllComments,
} from "../controllers/comments.js";

const router = express.Router();
router.route("/:id").post(upload.array("gallery"), createComment);

router.route("/:id").get(getAllComments).delete(deleteComment);

// router.route("/get").get
export const commentRouter = router;
