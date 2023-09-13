import express from "express";
import "./db";
import note from "./model/note";

// create a server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface IncomingBody {
  title: string;
  description?: string;
}

app.post("/", (req, res) => {
  // res.send('<h1>Hello world, how are you!</h1>')
  res.json({ message: "I am listening to you" });
  console.log(req.body);
});

app.post("/create", async (req, res) => {
  const newNote = new note({
    title: req.body.title as IncomingBody,
    description: req.body.description as IncomingBody,
  });
  await newNote.save();
  res.json({ message: "I am listening to create!" });
});

app.patch("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  // const note = await Note.findById(noteId);
  // if (!note) return res.json({ error: "Note not found!" });

  const { title, description } = req.body as IncomingBody;
  // if (title) note.title = title;
  // if (description) note.description = description;

  const notes = await note.findByIdAndUpdate(
    noteId,
    { title, description },
    { new: true }
  );
  if (!notes) return res.json({ error: "Note not found!" });

  await notes.save();

  res.json({ notes });
});

app.delete("/:noteId", async (req, res) => {
  const { noteId } = req.params;

  const removedNote = await note.findByIdAndDelete(noteId);
  if (!removedNote) return res.json({ error: "Could not remove note!" });

  res.json({ message: "Note removed successfully." });
});

app.get("/", async (req, res) => {
  const notes = await note.find();
  res.json({ notes });
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const notes = await note.findById(id);
  if (!notes) return res.json({ error: "Note not found!" });
  res.json({ notes });
});

// listen to some port
app.listen(3000, () => {
  console.log("Hello world");
});
