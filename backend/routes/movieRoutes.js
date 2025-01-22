import express from "express";
import { getMovieRecommendations } from "../controllers/movieController.js";

const router = express.Router();

router.post("/getMoviesRecommendations", getMovieRecommendations);

export default router;
