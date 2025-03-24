import express from "express";

import {
  getAllFilms,
  getFilmById,
  createFilm,
  deleteFilm,
} from "../controllers/filmController.js"

const router = express.Router();

router.get("/", getAllFilms);
router.get("/:id", getFilmById);
router.post("/", createFilm);
router.delete("/:id", deleteFilm);

export default router;