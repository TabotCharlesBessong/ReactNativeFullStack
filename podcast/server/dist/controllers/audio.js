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
exports.getLatestUploads = exports.updateAudio = exports.createAudio = void 0;
const cloud_1 = __importDefault(require("../cloud"));
const audio_1 = __importDefault(require("../models/audio"));
const createAudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { title, about, category } = req.body;
    const poster = (_a = req.files) === null || _a === void 0 ? void 0 : _a.poster;
    const audioFile = (_b = req.files) === null || _b === void 0 ? void 0 : _b.file;
    const ownerId = req.user.id;
    if (!audioFile)
        return res.status(422).json({ error: "Audio file is missing!" });
    const audioRes = yield cloud_1.default.uploader.upload(audioFile.filepath, {
        resource_type: "video",
    });
    const newAudio = new audio_1.default({
        title,
        about,
        category,
        owner: ownerId,
        file: { url: audioRes.secure_url, publicId: audioRes.public_id },
    });
    if (poster) {
        const posterRes = yield cloud_1.default.uploader.upload(poster.filepath, {
            width: 300,
            height: 300,
            crop: "thumb",
            gravity: "face",
        });
        newAudio.poster = {
            url: posterRes.secure_url,
            publicId: posterRes.public_id,
        };
    }
    yield newAudio.save();
    res.status(201).json({
        audio: {
            title,
            about,
            file: newAudio.file.url,
            poster: (_c = newAudio.poster) === null || _c === void 0 ? void 0 : _c.url,
        },
    });
});
exports.createAudio = createAudio;
const updateAudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const { title, about, category } = req.body;
    const poster = (_d = req.files) === null || _d === void 0 ? void 0 : _d.poster;
    const ownerId = req.user.id;
    const { audioId } = req.params;
    const audio = yield audio_1.default.findOneAndUpdate({ owner: ownerId, _id: audioId }, { title, about, category }, { new: true });
    if (!audio)
        return res.status(404).json({ error: "Record not found!" });
    if (poster) {
        if ((_e = audio.poster) === null || _e === void 0 ? void 0 : _e.publicId) {
            yield cloud_1.default.uploader.destroy(audio.poster.publicId);
        }
        const posterRes = yield cloud_1.default.uploader.upload(poster.filepath, {
            width: 300,
            height: 300,
            crop: "thumb",
            gravity: "face",
        });
        audio.poster = {
            url: posterRes.secure_url,
            publicId: posterRes.public_id,
        };
        yield audio.save();
    }
    res.status(201).json({
        audio: {
            title,
            about,
            file: audio.file.url,
            poster: (_f = audio.poster) === null || _f === void 0 ? void 0 : _f.url,
        },
    });
});
exports.updateAudio = updateAudio;
const getLatestUploads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield audio_1.default.find()
        .sort("-createdAt")
        .limit(10)
        .populate("owner");
    const audios = list.map((item) => {
        var _a;
        return {
            id: item._id,
            title: item.title,
            about: item.about,
            category: item.category,
            file: item.file.url,
            poster: (_a = item.poster) === null || _a === void 0 ? void 0 : _a.url,
            owner: { name: item.owner.name, id: item.owner._id },
        };
    });
    res.json({ audios });
});
exports.getLatestUploads = getLatestUploads;
