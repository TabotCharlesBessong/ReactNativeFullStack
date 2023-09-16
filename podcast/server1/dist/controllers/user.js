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
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = __importDefault(require("#/models/user"));
const variables_1 = require("#/utils/variables");
const helper_1 = require("#/utils/helper");
const token_1 = __importDefault(require("#/models/token"));
const template_1 = require("#/mail/template");
const path_1 = __importDefault(require("path"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const user = yield user_1.default.create({ name, email, password });
    const transport = nodemailer_1.default.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: variables_1.MAILTRAP_USER,
            pass: variables_1.MAILTRAP_PASS,
        },
    });
    const token = (0, helper_1.generateToken)(6);
    const newToken = yield token_1.default.create({
        owner: user._id,
        token
    });
    newToken.compareToken('123456');
    const welcomeMessage = `Hi ${name}, welcome to Podify! There are so much thing that we do for verified users. Use the given OTP to verify your email and enjoy the benefit of a verified user`;
    transport.sendMail({
        to: user.email,
        from: "auth@gmail.com",
        subject: "Welcome message",
        html: (0, template_1.generateTemplate)({
            title: "Welcome to Podify",
            message: welcomeMessage,
            logo: "cid:logo",
            banner: "cid:welcome",
            link: "#",
            btnTitle: token,
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path_1.default.join(__dirname, "../mail/logo.png"),
                cid: "logo",
            },
            {
                filename: "welcome.png",
                path: path_1.default.join(__dirname, "../mail/welcome.png"),
                cid: "welcome",
            },
        ],
    });
    res.status(201).json({ user });
});
exports.create = create;
