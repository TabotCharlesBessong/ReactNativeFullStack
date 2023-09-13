import express from "express";
import './db'
import note from "./model/note";

// create a server
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post(
  "/",
  (req, res) => {
    // res.send('<h1>Hello world, how are you!</h1>')
    res.json({ message: "I am listening to you" });
    console.log(req.body);
  }
);

app.post("/create",async (req,res) => {
  const newNote = new note({title:req.body.title,description:req.body.description})
  await newNote.save()
  res.json({message:"I am listening to create!"})
})

// listen to some port
app.listen(3000, () => {
  console.log("Hello world");
});
