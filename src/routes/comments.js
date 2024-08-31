import express from "express";
import { upload } from "../config/cloudinary.js";
import { createComment, deleteComment, getAllComments } from "../controllers/comments.js";

const router = express.Router();
router.route("/:id")
.post(upload.array("commentGallery"), createComment);


router.route("/:id")
.get(getAllComments)
.delete(deleteComment);

router.route("/:id")
.patch()
// router.route("/get").get
export const commentRouter = router;
