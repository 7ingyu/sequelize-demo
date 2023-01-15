'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SetTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Event, Band, Stage}) {
      // define association here
      SetTime.belongsTo(Event);
      SetTime.belongsTo(Band);
      SetTime.belongsTo(Stage);
    }
  }
  SetTime.init({
    eventId: DataTypes.INTEGER,
    stageId: DataTypes.INTEGER,
    bandId: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SetTime',
  });
  return SetTime;
};