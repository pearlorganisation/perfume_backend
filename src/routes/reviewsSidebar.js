import express from 'express'
import { addReviewSidebar, deleteReviewsSidebar, getReviewsSidebar } from '../controllers/reviewsSidebar.js'
import { upload } from '../config/cloudinary.js'

const router = express.Router()

router.route("/").get(getReviewsSidebar).post(upload.fields([{ name: "banner" }]), addReviewSidebar).delete(deleteReviewsSidebar)

export default router