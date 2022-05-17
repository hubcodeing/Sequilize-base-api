import express from "express";
const router = express.Router();
import { notesController } from "../controller";
import { auth } from "../middelware";

router.post("/user", auth, notesController.user);

router.post("/combine", auth, notesController.combine);

// router.get("/", auth, notesController.get);

router.get("/getnotes/:id", auth, notesController.getid);

router.put("/user/:id", notesController.genius);

router.delete("/user", auth, notesController.note);

router.get("/", auth, notesController.uuu);

export default router;
