import express from "express";
import { upload } from "../config/cloudinary.js";
import { addRelatedFragram, deleteRelatedFragram, getRelatedFragrams,getSingleRelatedFragram,updateRelatedFragram } from "../controllers/relatedFragrams.js";

const relatedFragramRouter = express.Router();

relatedFragramRouter.route("/").get(getRelatedFragrams).post(upload.fields([{ name: "banner" }]),addRelatedFragram)
  
relatedFragramRouter.route("/single/:id").get(getSingleRelatedFragram).patch(upload.fields([{ name: "banner" }]), updateRelatedFragram).delete(deleteRelatedFragram)


export default relatedFragramRouter;