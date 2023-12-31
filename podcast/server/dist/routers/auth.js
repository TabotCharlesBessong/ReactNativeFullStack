"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const validator_1 = require("../middleware/validator");
const validationSchema_1 = require("../utils/validationSchema");
const express_1 = require("express");
const fileParser_1 = __importDefault(require("../middleware/fileParser"));
const router = (0, express_1.Router)();
router.post("/create", (0, validator_1.validate)(validationSchema_1.CreateUserSchema), auth_1.create);
router.post("/verify-email", (0, validator_1.validate)(validationSchema_1.TokenAndIDValidation), auth_1.verifyEmail);
router.post("/re-verify-email", auth_1.sendReVerificationToken);
router.post("/forget-password", auth_1.generateForgetPasswordLink);
router.post("/verify-pass-reset-token", (0, validator_1.validate)(validationSchema_1.TokenAndIDValidation), auth_2.isValidPassResetToken, auth_1.grantValid);
router.post("/update-password", (0, validator_1.validate)(validationSchema_1.UpdatePasswordSchema), auth_2.isValidPassResetToken, auth_1.updatePassword);
router.post("/sign-in", (0, validator_1.validate)(validationSchema_1.SignInValidationSchema), auth_1.signIn);
router.get("/is-auth", auth_2.mustAuth, auth_1.sendProfile);
router.post("/update-profile", auth_2.mustAuth, fileParser_1.default, auth_1.updateProfile);
router.post("/log-out", auth_2.mustAuth, auth_1.logOut);
exports.default = router;
