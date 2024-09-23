import express from "express";
import { upload } from "../config/cloudinary.js";
import { addPerfumeCategories, deletePerfumeCategories, getPerfumeCategories,getSinglePerfumeCategories,updatePerfumeCategories } from "../controllers/perfumeCategories.js";

const perfumeCategoriesRouter = express.Router();

perfumeCategoriesRouter.route("/").get(getPerfumeCategories).post(upload.fields([{ name: "banner" }]),addPerfumeCategories)
  
perfumeCategoriesRouter.route("/single/:id").get(getSinglePerfumeCategories).patch(upload.fields([{ name: "banner" }]), updatePerfumeCategories).delete(deletePerfumeCategories)


export default perfumeCategoriesRouter;