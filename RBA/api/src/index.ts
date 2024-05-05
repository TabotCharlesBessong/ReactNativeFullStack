import express from "express"
import dotenv from "dotenv"
import "./db"

dotenv.config()

const app = express()
const port = (process.env.PORT || 5000) as string

app.listen(port,() => {
  console.log(`App is running on http://localhost:${port}`)
})