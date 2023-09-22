"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formidable_1 = __importDefault(require("formidable"));
const fileParser = (req, res, next) => {
    var _a;
    if (!((_a = req.headers["content-type"]) === null || _a === void 0 ? void 0 : _a.startsWith("multipart/form-data")))
        return res.status(422).json({ error: "Only accepts form-data!" });
    const form = (0, formidable_1.default)({ multiples: false });
    form.parse(req, (err, fields, files) => {
        if (err)
            return next(err);
        req.body = fields;
        req.files = files;
        next();
    });
};
exports.default = fileParser;
