import express from "express";
import {
    createCollection,
    getAllCollections,
    getCollectionById,
    deleteCollection,
} from "../controllers/collectionController.js";
import {
    addFilmToCollection,
    getFilmsByCollection,
    updateFilmStatus,
} from "../controllers/collectionFilmsController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCollection);
router.get("/", authMiddleware, getAllCollections);
router.get("/:id", authMiddleware, getCollectionById);
router.delete("/:id", authMiddleware, deleteCollection);

router.post("/collection-films", authMiddleware, addFilmToCollection);
router.get(
    "/collection-films/:collection_id",

    getFilmsByCollection,
);
router.put("/collection-films", authMiddleware, updateFilmStatus);

export default router;
