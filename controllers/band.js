// DEPENDENCIES
const bands = require('express').Router()
const { Band, MeetGreet, Event, SetTime, Stage } = require('../models')
const { Op } = require("sequelize")

// FIND ALL BANDS
bands.get('/', async (req, res) => {
  try {
      let foundBands = await Band.findAll({
        attributes: ['id', 'name', 'genre'],
        order: [['name', 'ASC']],
        include: { all: true }
      })
      return res.status(200).json(foundBands)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
})

// FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
  try {
      const foundBand = await Band.findOne({
        where: { name: req.params.name },
        include: [
            {
                model: MeetGreet,
                include: {
                    model: Event,
                    where: { name: { [Op.like]: `%${req.query.event || ''}%` } }
                }
            },
            {
                model: SetTime,
                include: {
                    model: Stage,
                }
            }
        ],
        // order: [
        //     [{model: MeetGreet}, {model: Event}, 'start_time', 'DESC'],
        // ]
      });
      if (!foundBand) return res.status(404).json('not found')
      return res.status(200).json(foundBand)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
  try {
      const newBand = await Band.create(req.body)
      return res.status(200).json({
          message: 'Successfully inserted a new band',
          data: newBand
      })
  } catch(err) {
    return res.status(500).json(err)
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
      return res.status(200).json({
          message: `Successfully updated ${updatedBands} band(s)`
      })
  } catch(err) {
    return res.status(500).json(err)
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
      return res.status(200).json({
          message: `Successfully deleted ${deletedBands} band(s)`
      })
  } catch(err) {
    return res.status(500).json(err)
  }
})


// EXPORT
module.exports = bands
