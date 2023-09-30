"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favoriteSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Audio" }],
}, { timestamps: true });
const Favorite = mongoose_1.models.Favorite || (0, mongoose_1.model)("Favorite", favoriteSchema);
exports.default = Favorite;
