require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const { bandsController, eventsController, stageController } = require('./controllers')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// CONTROLLERS
app.use('/bands', bandsController)
app.use('/events', eventsController)
app.use('/stages', stageController)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})