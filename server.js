import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import morgan from "morgan";

// importing routers

import authRoutes from "./src/routes/auth.js";
import { reviewRouter } from "./src/routes/review.js";
import perfumeRoutes from "./src/routes/perfume.js";
import noteRoutes from "./src/routes/note.js";
import brandRoutes from "./src/routes/brands.js";
import newsRoutes from "./src/routes/news.js";
import { error } from "./src/middlewares/error.js";
import { topRatedPerfumeRouter } from "./src/routes/topRatedPerfume.js";
import { commentRouter } from "./src/routes/comments.js";
import { prosConsRouter } from "./src/routes/prosCons.js";
import { productReviewRouter } from "./src/routes/productReviewCount.js";
import { newArrivalRouter } from "./src/routes/newArrival.js";
import reviewsSidebarRouter from "./src/routes/reviewsSidebar.js";
import celebrityPerfumesRouter from "./src/routes/celebrityPerfumes.js";
import genderPerfumesRouter from "./src/routes/genderPerfumes.js";
import relatedFragramRouter from "./src/routes/relatedFragrams.js";
import perfumeCategoriesRouter from "./src/routes/perfumeCategories.js";
import fragramsRouter from "./src/routes/fragrams.js";
import { requestReviewRouter } from "./src/routes/requestReview.js";
import { writeReviewRouter } from "./src/routes/writeReview.js";
import globalDataRouter from "./src/routes/globalData.js";
import { countryIsoCodes } from "./src/routes/countryISOcodes.js";
import { salesOffRouter } from "./src/routes/salesOff.js";
import { reviewAnalyticsRouter } from "./src/routes/reviewAnalytics.js";
import { contactUsRouter } from "./src/routes/contactUs.js";
import { ImageUrlRouter } from "./src/routes/brandLinksImage.js";
import compression from "compression";
import cluster from "cluster";
import os from "os";
import chalk from "chalk";
import { redisClient } from "./src/Redis/Redis.js";
import { newsLetterRouter } from "./src/routes/newsLetter.js";
//MIDDLEWARES
dotenv.config();
const app = express();

app.use(compression({ threshold: "1024" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
const PORT = process.env.PORT || 8000;

//CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://perfumetrics.com",
      "https://admin.perfumetrics.com",
      "https://slow-papers-stand.loca.lt",
    ],
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    exposedHeaders: ["*", "Authorization"],
  })
);

//routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/newsLetter",newsLetterRouter);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/perfume", perfumeRoutes);
app.use("/api/v1/topRatedPerfume", topRatedPerfumeRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/note", noteRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/prosCons", prosConsRouter);
app.use("/api/v1/productReviewCount", productReviewRouter);
app.use("/api/v1/newArrival", newArrivalRouter);
app.use("/api/v1/reviewsSidebar", reviewsSidebarRouter);
app.use("/api/v1/celebrityPerfumes", celebrityPerfumesRouter);
app.use("/api/v1/genderPerfumes", genderPerfumesRouter);
app.use("/api/v1/relatedFragrams", relatedFragramRouter);
app.use("/api/v1/perfumeCategories", perfumeCategoriesRouter);
app.use("/api/v1/fragrams", fragramsRouter);
app.use("/api/v1/requestReview", requestReviewRouter);
app.use("/api/v1/writeReview", writeReviewRouter);
app.use("/api/v1/globalData", globalDataRouter);
app.use("/api/v1/countryISOcodes", countryIsoCodes);
app.use("/api/v1/salesOff", salesOffRouter);
app.use("/api/v1/review-analytics", reviewAnalyticsRouter);
app.use("/api/v1/contact-us", contactUsRouter);
app.use("/api/v1/url-Image", ImageUrlRouter);

app.use(error);

try {
  if (cluster.isPrimary) {
    const numCpus = os.cpus().length;
    console.log(chalk.bgGreenBright("No Of Cpu's", numCpus));
    for (let i = 0; i < numCpus; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker?.process} died. Restarting..`);
    });
    // console.log("This is Primary Cluster ", cluster);
  } else {
    app.listen(PORT, () => {
      connectDB();
      redisClient?.connect();
      console.log(`Listening to port ${PORT}`);
    });
  }
} catch (err) {
  console.log("Something Wrong Occured ", err);
}
