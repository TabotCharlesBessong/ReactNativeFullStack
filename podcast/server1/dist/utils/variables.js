"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_RESET_LINK = exports.VERIFICATION_EMAIL = exports.MAILTRAP_PASS = exports.MAILTRAP_USER = exports.MONGO_URI = void 0;
const { env } = process;
exports.MONGO_URI = env.MONGO_URI, exports.MAILTRAP_USER = env.MAILTRAP_USER, exports.MAILTRAP_PASS = env.MAILTRAP_PASS, exports.VERIFICATION_EMAIL = env.VERIFICATION_EMAIL, exports.PASSWORD_RESET_LINK = env.PASSWORD_RESET_LINK;
