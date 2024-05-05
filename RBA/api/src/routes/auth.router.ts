import { newUserValidator } from "../middleware/validator";
import { signin, signup } from "../controller/auth.controller";
import express from "express";

const router = express.Router();

router.post("/signup", newUserValidator, signup);
router.post("/signin", newUserValidator, signin);

export default router;
