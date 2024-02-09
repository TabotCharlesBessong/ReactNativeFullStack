const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const moment = require("moment");
const dotenv = require("dotenv");
const userRouter = require("./routers/user.router")
const postRouter = require("./routers/post.router")
const connectionRouter = require("./routers/connection.router")

const app = express();
const port = 5000 || process.env.PORT;
app.use(cors());
dotenv.config();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth",userRouter)
app.use("/connection",connectionRouter)
app.use("/post",postRouter)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the DB!!!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB ", error);
  });

app.listen(port, () => {
  console.log(`The server is running on port number ${port}.....`);
});
