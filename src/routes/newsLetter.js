import express from "express";
import { createNewsLetter, unSubscribeNewsLetter } from "../controllers/newsLetter.js";

const router = express.Router();

router.route("/").post(createNewsLetter);
router.route("/unSubscribe").get(unSubscribeNewsLetter);

export const newsLetterRouter =  router;
