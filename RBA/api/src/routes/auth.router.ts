import { newUserValidator } from "../middleware/validator"
import { signup } from "../controller/auth.controller"
import express from "express"

const router = express.Router()

router.post("/signup",newUserValidator,signup)

export default router