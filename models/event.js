'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({MeetGreet, Stage, StageEvent, SetTime}) {
      // define association here
      Event.hasMany(StageEvent, {
        foreignKey: 'eventId'
      });
      Event.hasMany(MeetGreet, {
        foreignKey: 'event_id'
      });
      Event.belongsToMany(Stage, {
        through: 'StageEvent',
        foreignKey: 'eventId',
        otherKey: 'stageId'
      });
      Event.hasMany(SetTime, {
        foreignKey: 'eventId'
      });
    }
  }
  Event.init({
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};