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
exports.getRecentlyPlayed = exports.getHistories = exports.removeHistory = exports.updateHistory = void 0;
const history_1 = __importDefault(require("../models/history"));
const updateHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oldHistory = yield history_1.default.findOne({ owner: req.user.id });
    const { audio, progress, date } = req.body;
    const history = { audio, progress, date };
    if (!oldHistory) {
        yield history_1.default.create({
            owner: req.user.id,
            last: history,
            all: [history],
        });
        return res.json({ success: true });
    }
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const histories = yield history_1.default.aggregate([
        { $match: { owner: req.user.id } },
        { $unwind: "$all" },
        {
            $match: {
                "all.date": {
                    $gte: startOfDay,
                    $lt: endOfDay,
                },
            },
        },
        {
            $project: {
                _id: 0,
                audioId: "$all.audio",
            },
        },
    ]);
    const sameDayHistory = histories.find(({ audioId }) => audioId.toString() === audio);
    if (sameDayHistory) {
        yield history_1.default.findOneAndUpdate({
            owner: req.user.id,
            "all.audio": audio,
        }, {
            $set: {
                "all.$.progress": progress,
                "all.$.date": date,
            },
        });
    }
    else {
        yield history_1.default.findByIdAndUpdate(oldHistory._id, {
            $push: { all: { $each: [history], $position: 0 } },
            $set: { last: history },
        });
    }
    res.json({ success: true });
});
exports.updateHistory = updateHistory;
const removeHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const removeAll = req.query.all === "yes";
    if (removeAll) {
        yield history_1.default.findOneAndDelete({ owner: req.user.id });
        return res.json({ success: true });
    }
    const histories = req.query.histories;
    const ids = JSON.parse(histories);
    yield history_1.default.findOneAndUpdate({ owner: req.user.id }, {
        $pull: { all: { _id: ids } },
    });
    res.json({ success: true });
});
exports.removeHistory = removeHistory;
const getHistories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = "20", pageNo = "0" } = req.query;
    const histories = yield history_1.default.aggregate([
        { $match: { owner: req.user.id } },
        {
            $project: {
                all: {
                    $slice: ["$all", parseInt(limit) * parseInt(pageNo), parseInt(limit)],
                },
            },
        },
        { $unwind: "$all" },
        {
            $lookup: {
                from: "audios",
                localField: "all.audio",
                foreignField: "_id",
                as: "audioInfo",
            },
        },
        { $unwind: "$audioInfo" },
        {
            $project: {
                _id: 0,
                id: "$all._id",
                audioId: "$audioInfo._id",
                date: "$all.date",
                title: "$audioInfo.title",
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$date" },
                },
                audios: { $push: "$$ROOT" },
            },
        },
        {
            $project: {
                _id: 0,
                id: "$id",
                date: "$_id",
                audios: "$$ROOT.audios",
            },
        },
        { $sort: { date: -1 } },
    ]);
    res.json({ histories });
});
exports.getHistories = getHistories;
const getRecentlyPlayed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const match = { $match: { owner: req.user.id } };
    const sliceMatch = {
        $project: {
            myHistory: { $slice: ["$all", 10] },
        },
    };
    const dateSort = {
        $project: {
            histories: {
                $sortArray: {
                    input: "$myHistory",
                    sortBy: { date: -1 },
                },
            },
        },
    };
    const unwindWithIndex = {
        $unwind: { path: "$histories", includeArrayIndex: "index" },
    };
    const audioLookup = {
        $lookup: {
            from: "audios",
            localField: "histories.audio",
            foreignField: "_id",
            as: "audioInfo",
        },
    };
    const unwindAudioInfo = {
        $unwind: "$audioInfo",
    };
    const userLookup = {
        $lookup: {
            from: "users",
            localField: "audioInfo.owner",
            foreignField: "_id",
            as: "owner",
        },
    };
    const unwindUser = { $unwind: "$owner" };
    const projectResult = {
        $project: {
            _id: 0,
            id: "$audioInfo._id",
            title: "$audioInfo.title",
            about: "$audioInfo.about",
            file: "$audioInfo.file.url",
            poster: "$audioInfo.poster.url",
            category: "$audioInfo.category.url",
            owner: { name: "$owner.name", id: "$owner._id" },
            date: "$histories.date",
            progress: "$histories.progress",
        },
    };
    const audios = yield history_1.default.aggregate([
        match,
        sliceMatch,
        dateSort,
        unwindWithIndex,
        audioLookup,
        unwindAudioInfo,
        userLookup,
        unwindUser,
        projectResult,
    ]);
    res.json({ audios });
});
exports.getRecentlyPlayed = getRecentlyPlayed;
