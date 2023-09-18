import {
  create,
  generateForgetPasswordLink,
  grantValid,
  sendReVerificationToken,
  updatePassword,
  verifyEmail,
} from "#/controllers/user";
import { isValidPassResetToken } from "#/middleware/auth";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  TokenAndIDValidation,
  UpdatePasswordSchema,
} from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forget-password", generateForgetPasswordLink);
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIDValidation),
  isValidPassResetToken,
  grantValid
);
router.post(
  "/update-password",
  validate(UpdatePasswordSchema),
  isValidPassResetToken,
  updatePassword
);

export default router;
