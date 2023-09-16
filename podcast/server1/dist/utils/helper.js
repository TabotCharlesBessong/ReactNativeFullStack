"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const generateToken = (length) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        let digit = Math.floor(Math.random() * 10);
        otp += digit;
    }
    return otp;
};
exports.generateToken = generateToken;
