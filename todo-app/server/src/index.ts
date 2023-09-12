import express from "express";

// create a server
const app = express();

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

app.post(
  "/",
  (req, res, next) => {
    // manipulate things here
    // read the data and want to add it to request.body
    req.on("data",(chunk) => {
      req.body = JSON.parse(chunk)
      next()
    })
  },
  (req, res) => {
    // res.send('<h1>Hello world, how are you!</h1>')
    res.json({ message: "I am listening to you" });
    console.log(req.body);
  }
);

// listen to some port
app.listen(3000, () => {
  console.log("Hello world");
});
