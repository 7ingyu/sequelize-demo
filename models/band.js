'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({MeetGreet, SetTime}) {
      // define association here
      Band.hasMany(MeetGreet, {
        foreignKey: "band_id",
        // as: 'meets',
        // sourceKey: "id",
      });
      Band.hasMany(SetTime, {
        foreignKey: "bandId",
        sourceKey: "id",
      });
    }
  }
  Band.init({
    name: DataTypes.STRING,
    genre: DataTypes.TEXT,
    available_start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Band',
  });
  return Band;
};