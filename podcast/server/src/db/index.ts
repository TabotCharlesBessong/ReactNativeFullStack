import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const URI = process.env.MONGO_URI as string

mongoose.connect(URI).then(() => {
  console.log('database connected')
}).catch((err) => {
  console.log(err)
})