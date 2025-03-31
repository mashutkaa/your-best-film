import express from "express";

import {
    getAllFilms,
    getFilmById,
    createFilm,
    deleteFilm,
} from "../controllers/filmController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllFilms);
router.get("/:id", getFilmById);
router.post("/", authMiddleware, createFilm);
router.delete("/:id", deleteFilm);

export default router;
