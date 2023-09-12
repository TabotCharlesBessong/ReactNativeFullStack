
import express from 'express'

// create a server
const app = express()

app.get('/',(req,res) => {
  res.send('<h1>Hello world</h1>')
})

// listen to some port
app.listen(3000,() => {
  console.log('Hello world')
})