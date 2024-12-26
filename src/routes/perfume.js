import express from "express";
import { upload } from "../config/cloudinary.js";
import { upload2 } from "../config/multer2.js";
import {
  deletePerfume,
  getAllPerfume,
  getPerfumeVote,
  getSinglePerfume,
  getSinglePerfumeBySlug,
  newPerfume,
  updatePerfume,
} from "../controllers/perfume.js";
import { getAllRecentPerfume } from "../controllers/recentPerfumes.js";
import {
  addVoteToPerfume,
  addVoteToPerfumeProsCons,
} from "../controllers/userGlobalCount.js";

const router = express.Router();

router.route("/recent").get(getAllRecentPerfume);
router.route("/voteProsCons").patch(addVoteToPerfumeProsCons);
router.route("/votePerfume").patch(addVoteToPerfume);
router
  .route("/")
  .post(
    upload.fields([
      { name: "gallery" },
      { name: "banner" },
      { name: "logo" },
      { name: "video" },
    ]),
    newPerfume
  )
  .get(getAllPerfume);

router
  .route("/:id")
  .delete(deletePerfume)
  .get(getSinglePerfume)
  .patch(
    upload2.fields([
      { name: "gallery" },
      { name: "banner" },
      { name: "logo" },
      { name: "video" },
    ]),
    updatePerfume
  );
router.route("/slug",getSinglePerfumeBySlug)
router.route("/like-dislike/:id").get(getPerfumeVote); //this route is to get like dislike for perfumes
export default router;
