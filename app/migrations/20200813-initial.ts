import { QueryInterface, DataTypes } from 'sequelize'

async function up(queryInterface: QueryInterface) {
  const { STRING, INTEGER, TEXT } = DataTypes
  await queryInterface.createTable('LogItems', {
    id: {
      type: INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    date: {
      type: STRING,
      allowNull: false
    },
    flag: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    content: {
      type: TEXT,
      allowNull: false
    },
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP',
    deletedAt: 'TIMESTAMP'
  })

  await queryInterface.addIndex('LogItems', ['date'], {
    fields: ['date']
  })
}

async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('LogItems')
}

module.exports = { up, down }
