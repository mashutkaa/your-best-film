const express = require("express");
require("dotenv").config();
const router = express.Router();

const {
    getFilmRecommendations,
} = require("../controllers/filmsRecommendations");

router.get("/", getFilmRecommendations);

module.exports = router;
