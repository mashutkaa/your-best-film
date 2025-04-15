import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import filmRoutes from "./routes/filmRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import "./migrations/createUserTable.js";
import "./migrations/createFilmTable.js";

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // твій фронтенд або "*" на свій страх і ризик
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/films", filmRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
