// DEPENDENCIES
const events = require('express').Router()
const { Band, MeetGreet, Event, SetTime, Stage, StageEvent } = require('../models')
const { Op } = require("sequelize")

const findInclude = [
  {
    model: MeetGreet,
    order: [['available_start_time', 'ASC']],
    include: {
      model: Band,
      attributes: ['id', 'name', 'genre', 'available_start_time', 'end_time'],
    },
    attributes: ['id', 'meet_start_time', 'meet_end_time'],
  },
  {
    model: SetTime,
    attributes: ['id', 'startTime', 'endTime'],
    order: [['startTime', 'ASC']],
    include: [
      {
        model: Band,
        attributes: ['id', 'name', 'genre', 'available_start_time', 'end_time'],
      },
      {
        model: Stage,
        attributes: ['id', 'name'],
      }
    ]
  },
  {
    model: Stage,
    attributes: ['id', 'name'],
    through: {
      attributes: []
    },
  },
];

// FIND ALL
events.get('/', async (req, res) => {
  try {
      let all = await Event.findAll({
        order: [['start_time', 'ASC']],
        attributes: ['id', 'name', 'date', 'start_time', 'end_time'],
        include: findInclude
      })
      return res.status(200).json(all)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
})

// FIND
events.get('/:name', async (req, res) => {
  try {
      const found = await Event.findOne({
        where: { name: req.params.name },
        include: findInclude,
      });
      if (!found) return res.status(404).json('not found')
      return res.status(200).json(found)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// CREATE
events.post('/', async (req, res) => {
  try {
      const created = await Event.create(req.body)
      return res.status(200).json({
          message: 'Successfully inserted a new event',
          data: created
      })
  } catch(err) {
    return res.status(500).json(err)
  }
})

// UPDATE
events.put('/:id', async (req, res) => {
  try {
      console.log('Updating event id', req.params.id);
      const numUpdated = await Event.update(req.body, {
          where: {
              id: req.params.id
          }
      })
      return res.status(200).json({
          message: `Successfully updated ${numUpdated} event(s)`
      })
  } catch(err) {
    return res.status(500).json(err)
  }
})

// DELETE
events.delete('/:id', async (req, res) => {
  try {
      const numDeleted = await Event.destroy({
          where: {
              id: req.params.id
          }
      })
      return res.status(200).json({
          message: `Successfully deleted ${numDeleted} events(s)`
      })
  } catch(err) {
    return res.status(500).json(err)
  }
})


// EXPORT
module.exports = events
