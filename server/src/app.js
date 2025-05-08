const express = require("express");

const corsMiddleware = require("./middlewares/corsMiddleware");

const updateBestFilmsMonthly = require("./cron/updateBestFilmsMonthly");

const bestFilmsRouter = require("./routes/bestFilms");
const filmsRecommendations = require("./routes/filmsRecommendations");

const app = express();

app.use(corsMiddleware);

updateBestFilmsMonthly();

app.use("/api/v2/best-films", bestFilmsRouter);
app.use("/api/v2/movie-recommendations", filmsRecommendations);

module.exports = app;
