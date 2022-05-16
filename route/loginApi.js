import express from "express";
const router = express.Router();
import { userController } from "../controller";
import { upload } from "../middelware";

router.post("/", userController.register);

router.post("/csv", upload, userController.csvfileUpload);

router.post("/login", userController.login);

router.get("/:id", upload, userController.getid);

router.put("/:id", userController.update);

router.delete("/", upload, userController.pop);

router.post("/photo", userController.profileurlpath);

export default router;
