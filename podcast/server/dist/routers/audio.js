"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const audio_1 = require("../controllers/audio");
const auth_1 = require("../middleware/auth");
const fileParser_1 = __importDefault(require("../middleware/fileParser"));
const validator_1 = require("../middleware/validator");
const validationSchema_1 = require("../utils/validationSchema");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/create", auth_1.mustAuth, auth_1.isVerified, fileParser_1.default, (0, validator_1.validate)(validationSchema_1.AudioValidationSchema), audio_1.createAudio);
router.patch("/:audioId", auth_1.mustAuth, auth_1.isVerified, fileParser_1.default, (0, validator_1.validate)(validationSchema_1.AudioValidationSchema), audio_1.updateAudio);
router.get("/latest", audio_1.getLatestUploads);
exports.default = router;
