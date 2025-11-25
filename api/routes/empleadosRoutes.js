import express from "express";
import { EmpleadosController } from "../controllers/empleadosController.js";

const router = express.Router();

router.get("/",  (req, res) => EmpleadosController.list(req, res));
router.post("/", (req, res) => EmpleadosController.create(req, res));
router.put("/:id", (req, res) => EmpleadosController.update(req, res));
router.delete("/:id", (req, res) => EmpleadosController.remove(req, res));

export default router;
