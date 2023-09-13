
import { Schema, model } from "mongoose";

export interface NoteDocument {
  title: string;
  description?: string;
}

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

export default model<NoteDocument>("Note", noteSchema);