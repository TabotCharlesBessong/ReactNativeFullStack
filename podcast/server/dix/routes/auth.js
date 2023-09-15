"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./../controller/user");
const validator_1 = require("./../middleware/validator");
const validationSchema_1 = require("./../utils/validationSchema");
const router = (0, express_1.Router)();
router.post("/create", (0, validator_1.validate)(validationSchema_1.CreateUserSchema), user_1.create);
exports.default = router;
