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
exports.logOut = exports.updateProfile = exports.signIn = exports.updatePassword = exports.grantValid = exports.generateForgetPasswordLink = exports.sendReVerificationToken = exports.verifyEmail = exports.create = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("#/models/user"));
const helper_1 = require("#/utils/helper");
const mail_1 = require("#/utils/mail");
const emailVerificationToken_1 = __importDefault(require("#/models/emailVerificationToken"));
const passwordResetToken_1 = __importDefault(require("#/models/passwordResetToken"));
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const variables_1 = require("#/utils/variables");
const cloud_1 = __importDefault(require("#/cloud"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const user = yield user_1.default.create({ name, email, password });
    const token = (0, helper_1.generateToken)();
    yield emailVerificationToken_1.default.create({
        owner: user._id,
        token,
    });
    (0, mail_1.sendVerificationMail)(token, { name, email, userId: user._id.toString() });
    res.status(201).json({ user: { id: user._id, name, email } });
});
exports.create = create;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, userId } = req.body;
    const verificationToken = yield emailVerificationToken_1.default.findOne({
        owner: userId,
    });
    if (!verificationToken)
        return res.status(403).json({ error: "Invalid token!" });
    const matched = yield verificationToken.compareToken(token);
    if (!matched)
        return res.status(403).json({ error: "Invalid token!" });
    yield user_1.default.findByIdAndUpdate(userId, {
        verified: true,
    });
    yield emailVerificationToken_1.default.findByIdAndDelete(verificationToken._id);
    res.json({ message: "Your email is verified." });
});
exports.verifyEmail = verifyEmail;
const sendReVerificationToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!(0, mongoose_1.isValidObjectId)(userId))
        return res.status(403).json({ error: "Invalid request!" });
    const user = yield user_1.default.findById(userId);
    if (!user)
        return res.status(403).json({ error: "Invalid request!" });
    yield emailVerificationToken_1.default.findOneAndDelete({
        owner: userId,
    });
    const token = (0, helper_1.generateToken)();
    yield emailVerificationToken_1.default.create({
        owner: userId,
        token,
    });
    (0, mail_1.sendVerificationMail)(token, {
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        userId: user === null || user === void 0 ? void 0 : user._id.toString(),
    });
    res.json({ message: "Please check you mail." });
});
exports.sendReVerificationToken = sendReVerificationToken;
const generateForgetPasswordLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user)
        return res.status(404).json({ error: "Account not found!" });
    yield passwordResetToken_1.default.findOneAndDelete({
        owner: user._id,
    });
    const token = crypto_1.default.randomBytes(36).toString("hex");
    yield passwordResetToken_1.default.create({
        owner: user._id,
        token,
    });
    const resetLink = `${variables_1.PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`;
    (0, mail_1.sendForgetPasswordLink)({ email: user.email, link: resetLink });
    res.json({ message: "Check you registered mail." });
});
exports.generateForgetPasswordLink = generateForgetPasswordLink;
const grantValid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ valid: true });
});
exports.grantValid = grantValid;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, userId } = req.body;
    const user = yield user_1.default.findById(userId);
    if (!user)
        return res.status(403).json({ error: "Unauthorized access!" });
    const matched = yield user.comparePassword(password);
    if (matched)
        return res
            .status(422)
            .json({ error: "The new password must be different!" });
    user.password = password;
    yield user.save();
    yield passwordResetToken_1.default.findOneAndDelete({ owner: user._id });
    (0, mail_1.sendPassResetSuccessEmail)(user.name, user.email);
    res.json({ message: "Password resets successfully." });
});
exports.updatePassword = updatePassword;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { password, email } = req.body;
    const user = yield user_1.default.findOne({
        email,
    });
    if (!user)
        return res.status(403).json({ error: "Email/Password mismatch!" });
    const matched = yield user.comparePassword(password);
    if (!matched)
        return res.status(403).json({ error: "Email/Password mismatch!" });
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, variables_1.JWT_SECRET);
    user.tokens.push(token);
    yield user.save();
    res.json({
        profile: {
            id: user._id,
            name: user.name,
            email: user.email,
            verified: user.verified,
            avatar: (_a = user.avatar) === null || _a === void 0 ? void 0 : _a.url,
            followers: user.followers.length,
            followings: user.followings.length,
        },
        token,
    });
});
exports.signIn = signIn;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { name } = req.body;
    const avatar = (_b = req.files) === null || _b === void 0 ? void 0 : _b.avatar;
    const user = yield user_1.default.findById(req.user.id);
    if (!user)
        throw new Error("something went wrong, user not found!");
    if (typeof name !== "string")
        return res.status(422).json({ error: "Invalid name!" });
    if (name.trim().length < 3)
        return res.status(422).json({ error: "Invalid name!" });
    user.name = name;
    if (avatar) {
        const { secure_url, public_id } = yield cloud_1.default.uploader.upload(avatar.filepath, {
            width: 300,
            height: 300,
            crop: "thumb",
            gravity: "face",
        });
        user.avatar = { url: secure_url, publicId: public_id };
    }
    yield user.save();
    res.json({ avatar: user.avatar });
});
exports.updateProfile = updateProfile;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromAll } = req.query;
    const token = req.token;
    const user = yield user_1.default.findById(req.user.id);
    if (!user)
        throw new Error("something went wrong, user not found!");
    if (fromAll === "yes")
        user.tokens = [];
    else
        user.tokens = user.tokens.filter(t => t !== token);
    yield user.save();
    res.json({ success: true });
});
exports.logOut = logOut;
