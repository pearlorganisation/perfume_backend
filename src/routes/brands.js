import express from "express";
import {
  deleteBrand,
  getAllBrands,
  getAllBrandsMenu,
  getSingleBrandPerfumes,
  newBrand,
  updateBrand,
} from "../controllers/brand.js";
const router = express.Router();

router.route("/menu").get(getAllBrandsMenu);
router.route("/").get(getAllBrands).post(newBrand);
router.route("/:id").delete(deleteBrand).patch(updateBrand);
router.route("/slug/:slug").get(getSingleBrandPerfumes);
export default router;
