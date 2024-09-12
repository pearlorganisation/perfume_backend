import express from "express";
import { upload } from "../config/cloudinary.js";
import { addGlobalData, deleteGlobalData, getGlobalData, getSingleGlobalData, updateGlobalData } from "../controllers/globalData.js";

const globalDataRouter = express.Router();

globalDataRouter.route("/").get(getGlobalData).post(upload.fields([{ name: "file" }]),addGlobalData).delete(deleteGlobalData)
  
globalDataRouter.route("/:id").get(getSingleGlobalData).patch(upload.fields([{ name: "file" }]), updateGlobalData)


export default globalDataRouter;