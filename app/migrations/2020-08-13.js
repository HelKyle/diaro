import { QueryInterface, DataTypes } from 'sequelize'

async function up(queryInterface) {
  const { INTEGER } = DataTypes
  await queryInterface.addColumn('LogItems', 'flag', {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0
  })
}

async function down(queryInterface) {
  await queryInterface.removeColumn('LogItems', 'flag')
}

module.exports = { up, down }
