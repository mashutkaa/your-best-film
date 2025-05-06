const express = require("express");

const updateBestFilmsMonthly = require("./cron/updateBestFilmsMonthly");

const bestFilmsRouter = require("./routes/bestFilms");

const app = express();

updateBestFilmsMonthly();

app.use("/api/v2/best-films", bestFilmsRouter);

module.exports = app;
