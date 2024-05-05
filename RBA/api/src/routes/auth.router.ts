import express from "express";
import { adminResponse, privateResponse, signin, signup } from "../controller/auth.controller";
import { isAuth } from "../middleware/isAuth";
import { newUserValidator } from "../middleware/validator";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();

router.post("/signup", newUserValidator, signup);
router.post("/signin", newUserValidator, signin);
router.get("/private", isAuth, privateResponse);
router.get("/admin", isAuth, isAdmin,adminResponse);

export default router;
