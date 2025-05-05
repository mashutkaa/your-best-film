const express = require("express");

const bestFilmsRouter = require("./routes/bestFilms");

const app = express();

app.use("/api/v2/best-films", bestFilmsRouter);

module.exports = app;
