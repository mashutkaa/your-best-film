const express = require("express");
const router = express.Router();

const {
    getAllBestFilms,
    getBestFilmById,
} = require("../controllers/bestFilms");

router.get("/", getAllBestFilms);

router.get("/:id", getBestFilmById);

module.exports = router;
