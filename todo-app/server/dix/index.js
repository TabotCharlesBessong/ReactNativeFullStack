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
const express_1 = __importDefault(require("express"));
require("./db");
const note_1 = __importDefault(require("./model/note"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/", (req, res) => {
    res.json({ message: "I am listening to you" });
    console.log(req.body);
});
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = new note_1.default({
        title: req.body.title,
        description: req.body.description,
    });
    yield newNote.save();
    res.json({ message: "I am listening to create!" });
}));
app.patch("/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const { title, description } = req.body;
    const notes = yield note_1.default.findByIdAndUpdate(noteId, { title, description }, { new: true });
    if (!notes)
        return res.json({ error: "Note not found!" });
    yield notes.save();
    res.json({ notes });
}));
app.delete("/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const removedNote = yield note_1.default.findByIdAndDelete(noteId);
    if (!removedNote)
        return res.json({ error: "Could not remove note!" });
    res.json({ message: "Note removed successfully." });
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_1.default.find();
    res.json({ notes });
}));
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const notes = yield note_1.default.findById(id);
    if (!notes)
        return res.json({ error: "Note not found!" });
    res.json({ notes });
}));
app.listen(3000, () => {
    console.log("Hello world");
});
