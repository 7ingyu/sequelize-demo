'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Event, StageEvent, SetTime}) {
      // define association here
      Stage.hasMany(StageEvent, {
        foreignKey: 'stageId'
      });
      Stage.belongsToMany(Event, {
        through: 'StageEvent',
        foreignKey: 'stageId',
        otherKey: 'eventId'
      });
      Stage.hasMany(SetTime, {
        foreignKey: 'stageId'
      });
    }
  }
  Stage.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stage',
  });
  return Stage;
};