"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const historySchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    last: {
        audio: { type: mongoose_1.Schema.Types.ObjectId, ref: "Audio" },
        progress: Number,
        date: {
            type: Date,
            required: true,
        },
    },
    all: [
        {
            audio: { type: mongoose_1.Schema.Types.ObjectId, ref: "Audio" },
            progress: Number,
            date: {
                type: Date,
                required: true,
            },
        },
    ],
}, { timestamps: true });
const History = mongoose_1.models.History || (0, mongoose_1.model)("History", historySchema);
exports.default = History;
