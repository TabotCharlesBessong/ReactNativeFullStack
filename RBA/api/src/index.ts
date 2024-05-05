import express from "express"
import dotenv from "dotenv"
import "./db"
import authRouter from "./routes/auth.router"

dotenv.config()

const app = express()
const port = (process.env.PORT || 5000) as string

app.use(express.json())

app.use("/api/auth",authRouter)

app.listen(port,() => {
  console.log(`App is running on http://localhost:${port}`)
})