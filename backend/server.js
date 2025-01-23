import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

import './migrations/createUserTable.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});