require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const bandsController = require('./controllers/band')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// CONTROLLERS
app.use('/bands', bandsController)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})