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
exports.create = void 0;
const user_1 = __importDefault(require("#/models/user"));
const helper_1 = require("#/utils/helper");
const mail_1 = require("#/utils/mail");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const user = yield user_1.default.create({ name, email, password });
    const token = (0, helper_1.generateToken)();
    (0, mail_1.sendVerificationMail)(token, { name, email, userId: user._id.toString() });
    res.status(201).json({ user: { id: user._id, name, email } });
});
exports.create = create;
