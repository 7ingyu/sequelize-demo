// DEPENDENCIES
const stage = require('express').Router()
const { Band, MeetGreet, Event, SetTime, Stage, StageEvent } = require('../models')
const { Op } = require("sequelize")

// FIND ALL
stage.get('/', async (req, res) => {
  try {
      let all = await Stage.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: Event,
            through: {
              attributes: []
            },
            attributes: ['id', 'name', 'date', 'start_time', 'end_time'],
            order: [['date', 'ASC']],
          },
        ]
      })
      return res.status(200).json(all)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
})

// FIND
stage.get('/:name', async (req, res) => {
  try {
      const found = await Stage.findOne({
        where: { name: req.params.name },
        attributes: ['id', 'name'],
        include: [
          {
            model: Event,
            through: {
              attributes: []
            },
            attributes: ['id', 'name', 'date', 'start_time', 'end_time'],
            order: [['date', 'ASC']],
          },
        ]
      });
      if (!found) return res.status(404).json('not found')
      return res.status(200).json(found)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// CREATE
stage.post('/', async (req, res) => {
  try {
      const created = await Stage.create(req.body)
      return res.status(200).json({
          message: 'Successfully inserted a new stage',
          data: created
      })
  } catch(err) {
    return res.status(500).json(err)
  }
})

// UPDATE
stage.put('/:id', async (req, res) => {
  try {
      console.log('Updating stage id', req.params.id);
      const numUpdated = await Stage.update(req.body, {
          where: {
              id: req.params.id
          }
      })
      return res.status(200).json({
          message: `Successfully updated ${numUpdated} stage(s)`
      })
  } catch(err) {
    return res.status(500).json(err)
  }
})

// DELETE
stage.delete('/:id', async (req, res) => {
  try {
      const numDeleted = await Stage.destroy({
          where: {
              id: req.params.id
          }
      })
      return res.status(200).json({
          message: `Successfully deleted ${numDeleted} stage(s)`
      })
  } catch(err) {
    return res.status(500).json(err)
  }
})


// EXPORT
module.exports = stage
