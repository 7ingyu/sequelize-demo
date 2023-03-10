'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Stage, Event}) {
      // define association here
      // StageEvent.hasMany(Stage, {
      //   foreignKey: 'stageId'
      // });
      // StageEvent.belongsToMany(Event, {
      //   foreignKey: 'eventId',
      //   targetKey: 'id',
      // });
    }
  }
  StageEvent.init({
    eventId: DataTypes.INTEGER,
    stageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StageEvent',
  });
  return StageEvent;
};