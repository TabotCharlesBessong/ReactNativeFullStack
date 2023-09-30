"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const playlistSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    items: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: "Audio",
        },
    ],
    visibility: {
        type: String,
        enum: ["public", "private", "auto"],
        default: "public",
    },
}, { timestamps: true });
const Playlist = mongoose_1.models.Playlist || (0, mongoose_1.model)("Playlist", playlistSchema);
exports.default = Playlist;
