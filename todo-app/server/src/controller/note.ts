
import { RequestHandler } from "express";
import note from "../model/note";

export interface IncomingBody {
  title: string;
  description?: string;
}

export const create: RequestHandler = async (req, res) => {
  const newNote = new note({
    title: req.body.title as IncomingBody,
    description: req.body.description as IncomingBody,
  });
  await newNote.save();
  res.json({ message: "I am listening to create!" });
};

export const update: RequestHandler = async (req, res) => {
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
};

export const remove: RequestHandler = async (req, res) => {
  const { noteId } = req.params;

  const removedNote = await note.findByIdAndDelete(noteId);
  if (!removedNote) return res.json({ error: "Could not remove note!" });

  res.json({ message: "Note removed successfully." });
};

export const getAll:RequestHandler = async (req, res) => {
  const notes = await note.find();
  res.json({ notes });
};

export const getOne: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const notes = await note.findById(id);
  if (!notes) return res.json({ error: "Note not found!" });
  res.json({ notes });
};