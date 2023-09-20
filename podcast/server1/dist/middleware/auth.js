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
exports.isValidPassResetToken = void 0;
const passwordResetToken_1 = __importDefault(require("../models/passwordResetToken"));
const isValidPassResetToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, userId } = req.body;
    const resetToken = yield passwordResetToken_1.default.findOne({ owner: userId });
    if (!resetToken)
        return res
            .status(403)
            .json({ error: "Unauthorized access, invalid token!" });
    const matched = yield resetToken.compareToken(token);
    if (!matched)
        return res
            .status(403)
            .json({ error: "Unauthorized access, invalid token!" });
    next();
});
exports.isValidPassResetToken = isValidPassResetToken;
