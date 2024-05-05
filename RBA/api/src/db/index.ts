import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const URL = process.env.MONGO_URI as string;

mongoose.connect(URL).then(() => {
  console.log("Connected to the database successfully")
}).catch(err => console.log("Could not connect: ",err.message))