"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("#/controllers/user");
const auth_1 = require("#/middleware/auth");
const fileParser_1 = __importDefault(require("#/middleware/fileParser"));
const validator_1 = require("#/middleware/validator");
const validationSchema_1 = require("#/utils/validationSchema");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/create", (0, validator_1.validate)(validationSchema_1.CreateUserSchema), user_1.create);
router.post("/verify-email", (0, validator_1.validate)(validationSchema_1.TokenAndIDValidation), user_1.verifyEmail);
router.post("/re-verify-email", user_1.sendReVerificationToken);
router.post("/forget-password", user_1.generateForgetPasswordLink);
router.post("/verify-pass-reset-token", (0, validator_1.validate)(validationSchema_1.TokenAndIDValidation), auth_1.isValidPassResetToken, user_1.grantValid);
router.post("/update-password", (0, validator_1.validate)(validationSchema_1.UpdatePasswordSchema), auth_1.isValidPassResetToken, user_1.updatePassword);
router.post("/sign-in", (0, validator_1.validate)(validationSchema_1.SignInValidationSchema), user_1.signIn);
router.get("/is-auth", auth_1.mustAuth, (req, res) => {
    res.json({
        profile: req.user,
    });
});
router.post("/update-profile", fileParser_1.default, (req, res) => {
    console.log(req.files);
    return res.json({ ok: true });
});
exports.default = router;
