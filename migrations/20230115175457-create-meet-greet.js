'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MeetGreets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Events',
          },
          key: 'id'
        },
      },
      band_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Bands',
          },
          key: 'id'
        },
      },
      meet_start_time: {
        type: Sequelize.DATE
      },
      meet_end_time: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MeetGreets');
  }
};