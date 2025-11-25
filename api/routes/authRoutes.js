import express from "express";
import { AuthController } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", (req, res) => AuthController.login(req, res));

export default router;
