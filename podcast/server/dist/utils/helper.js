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
exports.getUsersPreviousHistory = exports.formatProfile = exports.generateToken = void 0;
const history_1 = __importDefault(require("../models/history"));
const moment_1 = __importDefault(require("moment"));
const generateToken = (length = 6) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * 10);
        otp += digit;
    }
    return otp;
};
exports.generateToken = generateToken;
const formatProfile = (user) => {
    var _a;
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified,
        avatar: (_a = user.avatar) === null || _a === void 0 ? void 0 : _a.url,
        followers: user.followers.length,
        followings: user.followings.length,
    };
};
exports.formatProfile = formatProfile;
const getUsersPreviousHistory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield history_1.default.aggregate([
        { $match: { owner: req.user.id } },
        { $unwind: "$all" },
        {
            $match: {
                "all.date": {
                    $gte: (0, moment_1.default)().subtract(30, "days").toDate(),
                },
            },
        },
        { $group: { _id: "$all.audio" } },
        {
            $lookup: {
                from: "audios",
                localField: "_id",
                foreignField: "_id",
                as: "audioData",
            },
        },
        { $unwind: "$audioData" },
        { $group: { _id: null, category: { $addToSet: "$audioData.category" } } },
    ]);
    if (result) {
        return result.category;
    }
    return [];
});
exports.getUsersPreviousHistory = getUsersPreviousHistory;
