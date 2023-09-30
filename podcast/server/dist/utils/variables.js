"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUD_SECRET = exports.CLOUD_KEY = exports.CLOUD_NAME = exports.JWT_SECRET = exports.SIGN_IN_URL = exports.PASSWORD_RESET_LINK = exports.VERIFICATION_EMAIL = exports.MAILTRAP_PASS = exports.MAILTRAP_USER = exports.MONGO_URI = void 0;
const { env } = process;
exports.MONGO_URI = env.MONGO_URI, exports.MAILTRAP_USER = env.MAILTRAP_USER, exports.MAILTRAP_PASS = env.MAILTRAP_PASS, exports.VERIFICATION_EMAIL = env.VERIFICATION_EMAIL, exports.PASSWORD_RESET_LINK = env.PASSWORD_RESET_LINK, exports.SIGN_IN_URL = env.SIGN_IN_URL, exports.JWT_SECRET = env.JWT_SECRET, exports.CLOUD_NAME = env.CLOUD_NAME, exports.CLOUD_KEY = env.CLOUD_KEY, exports.CLOUD_SECRET = env.CLOUD_SECRET;
