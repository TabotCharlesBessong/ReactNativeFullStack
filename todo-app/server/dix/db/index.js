"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log("Connected to the database");
})
    .catch((err) => {
    console.error("Failed to connect to the database:", err);
});
