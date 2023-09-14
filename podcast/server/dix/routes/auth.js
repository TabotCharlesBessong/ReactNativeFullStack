"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/create', (req, res) => {
    const { email, name, password } = req.body;
    const user = new users_1.default({ email, name, password });
    user.save();
    res.json({ user });
});
exports.default = router;
