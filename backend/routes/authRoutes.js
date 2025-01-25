import express from "express";
import { register, login, verifyToken, confirmEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyToken", verifyToken);
router.get("/confirmEmail", confirmEmail);

export default router;
