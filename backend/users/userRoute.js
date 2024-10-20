import express from "express";
import { userAuth } from "./userController.js";

const router = express.Router();

router.post("/admin", userAuth);

export default router;
