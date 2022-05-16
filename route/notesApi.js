import express from "express";
const router = express.Router();
import { notesController } from "../controller";
import { auth } from "../middelware";

router.post("/user", auth, notesController.user);

router.post("/combine", auth, notesController.combine);

// router.get("/", auth, notesController.get);

router.get("/title", notesController.jjj);

router.get("/getnotes/:id", auth, notesController.getid);

router.put("/user/:id", notesController.genius);

router.delete("/user", auth, notesController.note);

router.get("/match", auth, notesController.match);

router.get("/project", auth, notesController.project);

router.get("/addfilds", auth, notesController.addfilds);

router.get("/size", auth, notesController.size);

router.get("/look", auth, notesController.look);

router.get("/lookup", auth, notesController.lookup);

router.get("/", auth, notesController.uuu);

export default router;
