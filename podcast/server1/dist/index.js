"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("./db");
const auth_1 = __importDefault(require("./routers/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/auth", auth_1.default);
const PORT = process.env.PORT || 8989;
app.listen(PORT, () => {
    console.log("Port is listening on port " + PORT);
});
