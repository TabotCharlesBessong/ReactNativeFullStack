import express from "express";
import { create, getAll, getOne, remove, update } from "./controller/note";
import "./db";
import cors from 'cors'

// create a server
const app = express();

app.use(cors)

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

app.post("/create", create);

app.patch("/:noteId", update);

app.delete("/:noteId", remove);

app.get("/:id", getOne);

app.get('/',getAll)

// listen to some port
app.listen(3000, () => {
  console.log("Hello world");
});
