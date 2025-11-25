import express from "express";
import multer from "multer";
import path from "path";
import { MascotasController } from "../controllers/mascotasController.js";

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'uploads')),
	filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '_'))
});
const upload = multer({ storage });

router.get("/",  (req, res) => MascotasController.list(req, res));
router.post("/", upload.single('image'), (req, res) => MascotasController.create(req, res));
router.put("/:id", upload.single('image'), (req, res) => MascotasController.update(req, res));
router.delete("/:id", (req, res) => MascotasController.remove(req, res));

export default router;
