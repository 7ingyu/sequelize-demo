// DEPENDENCIES
const events = require('express').Router()
const { Band, MeetGreet, Event, SetTime, Stage, StageEvent } = require('../models')
const { Op } = require("sequelize")

// FIND ALL EVENTS
events.get('/', async (req, res) => {
  try {
      let all = await Event.findAll({
        order: [['start_time', 'ASC']],
        include: [
          {
            model: MeetGreet,
            include: Band
          },
          {
            model: SetTime,
            include: [Band, Stage]
          },
          {
            model: Stage,
            include: StageEvent
          },
        ]
      })
      return res.status(200).json(all)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
})

// FIND A SPECIFIC EVENT
events.get('/:name', async (req, res) => {
  try {
      const found = await Event.findOne({
        where: { name: req.params.name },
        include: [
          {
            model: MeetGreet,
            include: Band
          },
          {
            model: SetTime,
            include: [Band, Stage]
          },
          {
            model: Stage,
            include: StageEvent
          },
        ]
        // order: [
        //     [{model: MeetGreet}, {model: Event}, 'start_time', 'DESC'],
        // ]
      });
      if (!found) return res.status(404).json('not found')
      return res.status(200).json(found)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// CREATE A EVENT
events.post('/', async (req, res) => {
  try {
      const created = await Event.create(req.body)
      return res.status(200).json({
          message: 'Successfully inserted a new band',
          data: created
      })
  } catch(err) {
    return res.status(500).json(err)
  }
})

// UPDATE A BAND
// events.put('/:id', async (req, res) => {
//   try {
//       const numUpdated = await Band.update(req.body, {
//           where: {
//               id: req.params.id
//           }
//       })
//       return res.status(200).json({
//           message: `Successfully updated ${numUpdated} band(s)`
//       })
//   } catch(err) {
//     return res.status(500).json(err)
//   }
// })

// DELETE A BAND
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