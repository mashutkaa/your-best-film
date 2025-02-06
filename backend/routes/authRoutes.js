import express from "express";
import { register, login, verifyToken, forgotPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyToken", verifyToken);
router.post("/forgotPassword", forgotPassword);

export default router;
