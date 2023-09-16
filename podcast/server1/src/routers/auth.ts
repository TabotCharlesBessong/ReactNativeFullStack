import { create, verifyEmail } from "#/controllers/user";
import { validate } from "#/middleware/validator";
import { CreateUserSchema } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email",verifyEmail)

export default router;
