import express from "express";
import { upload } from "../config/cloudinary.js";
import { deleteNews, getAllNews, getAllNewsAdmin, newNews } from "../controllers/news.js";

const router = express.Router();

router.route('/admin').get(getAllNewsAdmin)
router.route("/").get(getAllNews).post(upload.single("image"), newNews);
router.route("/:id").delete(deleteNews);
// router.route("/get").get
export default router;
