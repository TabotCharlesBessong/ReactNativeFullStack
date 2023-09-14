
import express from 'express'
import './db'
import authRoute from './routes/auth'

const app = express()

// register middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/auth",authRoute)

app.listen(3000,() => {
  console.log('Hello here am i')
})