"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = require("../utils/variables");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: variables_1.CLOUD_NAME,
    api_key: variables_1.CLOUD_KEY,
    api_secret: variables_1.CLOUD_SECRET,
    secure: true,
});
exports.default = cloudinary_1.v2;
