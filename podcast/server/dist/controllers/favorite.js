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
exports.getIsFavorite = exports.getFavorites = exports.toggleFavorite = void 0;
const audio_1 = __importDefault(require("../models/audio"));
const favorite_1 = __importDefault(require("../models/favorite"));
const mongoose_1 = require("mongoose");
const toggleFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const audioId = req.query.audioId;
    let status;
    if (!(0, mongoose_1.isValidObjectId)(audioId))
        return res.status(422).json({ error: "Audio id is invalid!" });
    const audio = yield audio_1.default.findById(audioId);
    if (!audio)
        return res.status(404).json({ error: "Resources not found!" });
    const alreadyExists = yield favorite_1.default.findOne({
        owner: req.user.id,
        items: audioId,
    });
    if (alreadyExists) {
        yield favorite_1.default.updateOne({ owner: req.user.id }, {
            $pull: { items: audioId },
        });
        status = "removed";
    }
    else {
        const favorite = yield favorite_1.default.findOne({ owner: req.user.id });
        if (favorite) {
            yield favorite_1.default.updateOne({ owner: req.user.id }, {
                $addToSet: { items: audioId },
            });
        }
        else {
            yield favorite_1.default.create({ owner: req.user.id, items: [audioId] });
        }
        status = "added";
    }
    if (status === "added") {
        yield audio_1.default.findByIdAndUpdate(audioId, {
            $addToSet: { likes: req.user.id },
        });
    }
    if (status === "removed") {
        yield audio_1.default.findByIdAndUpdate(audioId, {
            $pull: { likes: req.user.id },
        });
    }
    res.json({ status });
});
exports.toggleFavorite = toggleFavorite;
const getFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user.id;
    const { limit = "20", pageNo = "0" } = req.query;
    const favorites = yield favorite_1.default.aggregate([
        { $match: { owner: userID } },
        {
            $project: {
                audioIds: {
                    $slice: [
                        "$items",
                        parseInt(limit) * parseInt(pageNo),
                        parseInt(limit),
                    ],
                },
            },
        },
        { $unwind: "$audioIds" },
        {
            $lookup: {
                from: "audios",
                localField: "audioIds",
                foreignField: "_id",
                as: "audioInfo",
            },
        },
        { $unwind: "$audioInfo" },
        {
            $lookup: {
                from: "users",
                localField: "audioInfo.owner",
                foreignField: "_id",
                as: "ownerInfo",
            },
        },
        { $unwind: "$ownerInfo" },
        {
            $project: {
                _id: 0,
                id: "$audioInfo._id",
                title: "$audioInfo.title",
                about: "$audioInfo.about",
                category: "$audioInfo.category",
                file: "$audioInfo.file.url",
                poster: "$audioInfo.poster.url",
                owner: { name: "$ownerInfo.name", id: "$ownerInfo._id" },
            },
        },
    ]);
    res.json({ audios: favorites });
});
exports.getFavorites = getFavorites;
const getIsFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const audioId = req.query.audioId;
    if (!(0, mongoose_1.isValidObjectId)(audioId))
        return res.status(422).json({ error: "Invalid audio id!" });
    const favorite = yield favorite_1.default.findOne({
        owner: req.user.id,
        items: audioId,
    });
    res.json({ result: favorite ? true : false });
});
exports.getIsFavorite = getIsFavorite;
