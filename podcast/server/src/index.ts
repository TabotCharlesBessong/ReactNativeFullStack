
import express from 'express'
import './db'

const app = express()

app.listen(3000,() => {
  console.log('Hello here am i')
})