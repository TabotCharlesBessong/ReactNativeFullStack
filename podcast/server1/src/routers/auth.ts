import {
  create,
  generateForgetPasswordLink,
  grantValid,
  sendReVerificationToken,
  signIn,
  updatePassword,
  verifyEmail,
} from "#/controllers/user";
import { isValidPassResetToken } from "#/middleware/auth";
import { validate } from "#/middleware/validator";
import User from "#/models/user";
import {
  CreateUserSchema,
  SignInValidationSchema,
  TokenAndIDValidation,
  UpdatePasswordSchema,
} from "#/utils/validationSchema";
import { JWT_SECRET } from "#/utils/variables";
import { Router } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

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
router.post(
  "/sign-in",
  validate(SignInValidationSchema),
  signIn
);
router.get('/is-auth', async(req,res) => {
  // console.log(req.headers)
  const {authorization} =   req.headers
  const token =  authorization?.split("Bearer ")[1]
  // console.log(token)

  if(!token) return res.status(403).json({error:"Unauthorized request"})

  // @ts-ignore
  const verifyToken = verify(token,JWT_SECRET) as JwtPayload
  verifyToken.userId
  const id = console.log(verifyToken)

  // @ts-ignore
  const user = await User.findById(id)

  if(!user) return res.status(403).json({ error: "Unauthorized request" });

  res.json({
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      avatar: user.avatar?.url,
      followers: user.followers.length,
      following: user.followings.length,
    },
  });
})

export default router;
