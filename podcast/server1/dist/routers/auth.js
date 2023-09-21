"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("#/controllers/user");
const auth_1 = require("#/middleware/auth");
const validator_1 = require("#/middleware/validator");
const user_2 = __importDefault(require("#/models/user"));
const validationSchema_1 = require("#/utils/validationSchema");
const variables_1 = require("#/utils/variables");
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const router = (0, express_1.Router)();
router.post("/create", (0, validator_1.validate)(validationSchema_1.CreateUserSchema), user_1.create);
router.post("/verify-email", (0, validator_1.validate)(validationSchema_1.TokenAndIDValidation), user_1.verifyEmail);
router.post("/re-verify-email", user_1.sendReVerificationToken);
router.post("/forget-password", user_1.generateForgetPasswordLink);
router.post("/verify-pass-reset-token", (0, validator_1.validate)(validationSchema_1.TokenAndIDValidation), auth_1.isValidPassResetToken, user_1.grantValid);
router.post("/update-password", (0, validator_1.validate)(validationSchema_1.UpdatePasswordSchema), auth_1.isValidPassResetToken, user_1.updatePassword);
router.post("/sign-in", (0, validator_1.validate)(validationSchema_1.SignInValidationSchema), user_1.signIn);
router.get('/is-auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { authorization } = req.headers;
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.split("Bearer ")[1];
    if (!token)
        return res.status(403).json({ error: "Unauthorized request" });
    const verifyToken = (0, jsonwebtoken_1.verify)(token, variables_1.JWT_SECRET);
    verifyToken.userId;
    const id = console.log(verifyToken);
    const user = yield user_2.default.findById(id);
    if (!user)
        return res.status(403).json({ error: "Unauthorized request" });
    res.json({
        profile: {
            id: user._id,
            name: user.name,
            email: user.email,
            verified: user.verified,
            avatar: (_a = user.avatar) === null || _a === void 0 ? void 0 : _a.url,
            followers: user.followers.length,
            following: user.followings.length,
        },
    });
}));
exports.default = router;
