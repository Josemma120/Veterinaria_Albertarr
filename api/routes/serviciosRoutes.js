import express from "express";
import { ServiciosController } from "../controllers/serviciosController.js";

const router = express.Router();

router.get("/",  (req, res) => ServiciosController.list(req, res));
router.post("/", (req, res) => ServiciosController.create(req, res));
router.put("/:id", (req, res) => ServiciosController.update(req, res));
router.delete("/:id", (req, res) => ServiciosController.remove(req, res));

export default router;
