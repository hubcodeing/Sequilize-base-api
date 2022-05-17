import express from "express";
const router = express.Router();
import { notesController } from "../controller";
import { auth } from "../middelware";
router.get("/name", auth, notesController.all);

router.post("/user", auth, notesController.user);

router.post("/combine", auth, notesController.combine);

router.get("/yz", auth, notesController.get);

router.get("/getnotes/:id", auth, notesController.getid);

router.put("/user/:id", notesController.genius);

router.delete("/user", auth, notesController.note);

export default router;
