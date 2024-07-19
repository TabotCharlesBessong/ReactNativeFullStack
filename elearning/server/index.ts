import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./utils/db"
import rateLimit from "express-rate-limit"
import userRouter from "./routes/user.router"
// import { redis } from "./utils/redis"

const app = express()
const port = process.env.port || 5000

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors: cross origin resource sharing
app.use(
  cors({
    origin: "*",
  })
);

// testing api
app.get("/test",(req:Request,res:Response,next:NextFunction) => {
  res.status(200).json({
    name:"Charles",
    email:"charles@gmail.com"
  })
})

// routes
app.use("/api/user",userRouter)

app.all("*",(req:Request,res:Response) => {
  const err = new Error("Request failed")
})

// api requests limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const Boostrap = async function () {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log("Connection has been established successfully on port.");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

Boostrap();