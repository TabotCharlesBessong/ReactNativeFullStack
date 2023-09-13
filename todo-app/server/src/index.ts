import express from "express";

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

app.post("/create",(req,res) => {
  console.log(req.body)
  res.json({message:"I am listening to create!"})
})

// listen to some port
app.listen(3000, () => {
  console.log("Hello world");
});
