import express from "express";
import { getFemalePerfumes, getMalePerfumes } from "../controllers/perfume.js";

const genderPerfumesRouter = express.Router();
genderPerfumesRouter.route("/male").get(getMalePerfumes);
genderPerfumesRouter.route("/female").get(getFemalePerfumes);

export default genderPerfumesRouter;
