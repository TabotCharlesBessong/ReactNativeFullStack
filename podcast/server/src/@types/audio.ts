import { AudioDocument } from "#/models/audio";
import { Request } from "express";
import { ObjectId } from "mongoose";

export type PopulateFavList = AudioDocument<{ _id: ObjectId; name: string }>;

export interface CreatePlaylistRequest extends Request {
  body: { title: string; resId: string; visibility: "public" | "private" };
}

export interface UpdatePlaylistRequest extends Request {
  body: {
    title: string;
    id: string;
    item: string;
    visibility: "public" | "private";
  };
}
