
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const moment = require('moment')
const dotenv = require('dotenv')

const app = express()
const port = 5000 || process.env.PORT
app.use(cors())
dotenv.config()

// middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to the DB!!!")
}).catch((error) => {
  console.log("Error connecting to MongoDB ",error)
})

app.listen(port, () => {
  console.log(`The server is running on port number ${port}.....`)
})