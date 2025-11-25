import express from "express";
import { CitasController } from "../controllers/citasController.js";

const router = express.Router();

router.get("/", (req, res) => CitasController.list(req, res));
router.post("/", (req, res) => CitasController.create(req, res));
router.put("/:id", (req, res) => CitasController.update(req, res));
router.delete("/:id", (req, res) => CitasController.remove(req, res));

export default router;
