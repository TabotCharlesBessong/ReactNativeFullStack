import {
  create,
  generateForgetPasswordLink,
  isValidPassResetToken,
  sendReVerificationToken,
  verifyEmail,
} from "#/controllers/user";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  TokenAndIDValidation,
} from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forget-password", generateForgetPasswordLink);
router.post("/verify-pass-reset-token",validate(TokenAndIDValidation),isValidPassResetToken)

export default router;
