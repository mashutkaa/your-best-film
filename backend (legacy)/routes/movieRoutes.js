import express from "express";
import { getMovieRecommendations, getPopularMovies } from "../controllers/movieController.js";
import { conditionalRateLimiter } from "../middlewares/rateLimiterMiddleware.js";

const router = express.Router();

router.post("/getMoviesRecommendations", conditionalRateLimiter, getMovieRecommendations);
router.get("/getPopularMovies", getPopularMovies);

export default router;
