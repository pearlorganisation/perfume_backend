import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  getComments,
  voteComment,
} from "../controllers/comments.js";

const router = express.Router();
router.route('/').get(getComments)
router.route("/:id").post(upload.array("gallery"), createComment);

router.route("/:id")
.get(getAllComments)
.delete(deleteComment)


router.route("/vote-comment/:id")
.patch(voteComment)
.get(getCommentById)
;


// router.route("/get").get
export const commentRouter = router;
