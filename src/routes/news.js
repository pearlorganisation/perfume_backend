import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  deleteNews,
  getAllNews,
  getNewsById,
  newNews,
  updateNews,
  getAllNewsAdmin,
  getNewsBySlug,
} from "../controllers/news.js";

const router = express.Router();
router.route('/slug/:slug').get(getNewsBySlug)
router.route("/admin").get(getAllNewsAdmin);
router.route("/").get(getAllNews).post(upload.single("image"), newNews);
router
  .route("/:id")
  .delete(deleteNews)
  .get(getNewsById)
  .patch(upload.single("image"), updateNews);
// router.route("/get").get
export default router;
