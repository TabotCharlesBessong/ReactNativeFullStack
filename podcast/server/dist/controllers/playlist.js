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
exports.getAudios = exports.getPlaylistByProfile = exports.removePlaylist = exports.updatePlaylist = exports.createPlaylist = void 0;
const audio_1 = __importDefault(require("../models/audio"));
const playlist_1 = __importDefault(require("../models/playlist"));
const mongoose_1 = require("mongoose");
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, resId, visibility } = req.body;
    const ownerId = req.user.id;
    if (resId) {
        const audio = yield audio_1.default.findById(resId);
        if (!audio)
            return res.status(404).json({ error: "Could not found the audio!" });
    }
    const newPlaylist = new playlist_1.default({
        title,
        owner: ownerId,
        visibility,
    });
    if (resId)
        newPlaylist.items = [resId];
    yield newPlaylist.save();
    res.status(201).json({
        playlist: {
            id: newPlaylist._id,
            title: newPlaylist.title,
            visibility: newPlaylist.visibility,
        },
    });
});
exports.createPlaylist = createPlaylist;
const updatePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, item, title, visibility } = req.body;
    const playlist = yield playlist_1.default.findOneAndUpdate({ _id: id, owner: req.user.id }, { title, visibility }, { new: true });
    if (!playlist)
        return res.status(404).json({ error: "Playlist not found !" });
    if (item) {
        const audio = yield audio_1.default.findById(item);
        if (!audio)
            return res.status(404).json({ error: "Audio not found !" });
        yield playlist_1.default.findByIdAndUpdate(playlist._id, {
            $addToSet: { items: item },
        });
    }
    res.status(201).json({
        playlist: {
            id: playlist._id,
            title: playlist.title,
            visibility: playlist.visibility,
        },
    });
});
exports.updatePlaylist = updatePlaylist;
const removePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlistId, resId, all } = req.query;
    if (!(0, mongoose_1.isValidObjectId)(playlistId))
        return res.status(422).json({ error: "Invalid playlist id!" });
    if (all === "yes") {
        const playlist = yield playlist_1.default.findOneAndDelete({
            _id: playlistId,
            owner: req.user.id,
        });
        if (!playlist)
            return res.status(404).json({ error: "Playlist not found!" });
    }
    if (resId) {
        if (!(0, mongoose_1.isValidObjectId)(resId))
            return res.status(422).json({ error: "Invalid audio id!" });
        const playlist = yield playlist_1.default.findOneAndUpdate({
            _id: playlistId,
            owner: req.user.id,
        }, {
            $pull: { items: resId },
        });
        if (!playlist)
            return res.status(404).json({ error: "Playlist not found!" });
    }
    res.json({ success: true });
});
exports.removePlaylist = removePlaylist;
const getPlaylistByProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNo = "0", limit = "20" } = req.query;
    const data = yield playlist_1.default.find({
        owner: req.user.id,
        visibility: { $ne: "auto" },
    })
        .skip(parseInt(pageNo) * parseInt(limit))
        .limit(parseInt(limit))
        .sort("-createdAt");
    const playlist = data.map((item) => {
        return {
            id: item._id,
            title: item.title,
            itemsCount: item.items.length,
            visibility: item.visibility,
        };
    });
    res.json({ playlist });
});
exports.getPlaylistByProfile = getPlaylistByProfile;
const getAudios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlistId } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(playlistId))
        return res.status(422).json({ error: "Invalid playlist id!" });
    const playlist = yield playlist_1.default.findOne({
        owner: req.user.id,
        _id: playlistId,
    }).populate({
        path: "items",
        populate: {
            path: "owner",
            select: "name",
        },
    });
    if (!playlist)
        return res.json({ list: [] });
    const audios = playlist.items.map((item) => {
        var _a;
        return {
            id: item._id,
            title: item.title,
            category: item.category,
            file: item.file.url,
            poster: (_a = item.poster) === null || _a === void 0 ? void 0 : _a.url,
            owner: { name: item.owner.name, id: item.owner._id },
        };
    });
    res.json({
        list: {
            id: playlist._id,
            title: playlist.title,
            audios,
        },
    });
});
exports.getAudios = getAudios;
