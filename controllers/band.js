// DEPENDENCIES
const bands = require('express').Router()
const { Band, MeetGreet } = require('../models')

// FIND ALL BANDS
bands.get('/', async (req, res) => {
  try {
      const foundBands = await Band.findAll({
        attributes: ['id', 'name', 'genre'],
        order: [['name', 'ASC']],
      })
      res.status(200).json(foundBands)
  } catch (error) {
      res.status(500).json(error)
  }
})

// FIND A SPECIFIC BAND
bands.get('/:id', async (req, res) => {
  try {
      const foundBand = await Band.findOne({
          where: { id: req.params.id },
          attributes: [['id', 'identification_number'], 'name', 'genre']
      })
      if (!foundBand) res.status(404).json('not found')
      res.status(200).json(foundBand)
  } catch (error) {
      res.status(500).json(error)
  }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
  try {
      const newBand = await Band.create(req.body)
      res.status(200).json({
          message: 'Successfully inserted a new band',
          data: newBand
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
  try {
      const updatedBands = await Band.update(req.body, {
          where: {
              id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully updated ${updatedBands} band(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
  try {
      const deletedBands = await Band.destroy({
          where: {
              id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedBands} band(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})


// EXPORT
module.exports = bands
