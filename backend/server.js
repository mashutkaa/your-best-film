import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
