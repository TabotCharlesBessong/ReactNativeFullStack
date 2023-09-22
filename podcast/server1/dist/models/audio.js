"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const audio_category_1 = require("#/utils/audio_category");
const mongoose_1 = require("mongoose");
const AudioSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    file: {
        type: Object,
        url: String,
        publicId: String,
        required: true,
    },
    poster: {
        type: Object,
        url: String,
        publicId: String,
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    category: {
        type: String,
        enum: audio_category_1.categories,
        default: "Others",
    },
}, {
    timestamps: true,
});
const Audio = mongoose_1.models.Audio || (0, mongoose_1.model)("Audio", AudioSchema);
exports.default = Audio;
