import express from "express";
import {
  changePassword,
  changeUsername,
  deleteAccount,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/change-password", authMiddleware, changePassword);
router.put("/change-username", authMiddleware, changeUsername);
router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;
