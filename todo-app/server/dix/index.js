"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./db");
const note_1 = require("./controller/note");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/", (req, res) => {
    res.json({ message: "I am listening to you" });
    console.log(req.body);
});
app.post("/create", note_1.create);
app.patch("/:noteId", note_1.update);
app.delete("/:noteId", note_1.remove);
app.get("/:id", note_1.getOne);
app.get('/', note_1.getAll);
app.listen(3000, () => {
    console.log("Hello world");
});
