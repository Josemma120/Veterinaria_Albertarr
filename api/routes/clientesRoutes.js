import express from "express";
import { ClientesController } from "../controllers/clientesController.js";

const router = express.Router();

router.get("/",  (req, res) => ClientesController.list(req, res));
router.post("/", (req, res) => ClientesController.create(req, res));
router.put("/:id", (req, res) => ClientesController.update(req, res));
router.delete("/:id", (req, res) => ClientesController.remove(req, res));

export default router;
