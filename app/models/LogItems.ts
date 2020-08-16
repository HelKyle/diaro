import { Sequelize, DataTypes, Optional, Model, ModelCtor } from 'sequelize'

export interface LogItemAttributes {
  id: string
  date: string
  flag: number
  content: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface LogItemCreationAttributes
  extends Optional<LogItemAttributes, 'id'> {}

export interface LogItemInstance
  extends Model<LogItemAttributes, LogItemCreationAttributes>,
    LogItemAttributes {}

export default (sequelize: Sequelize): ModelCtor<LogItemInstance> => {
  const { STRING, INTEGER, TEXT } = DataTypes
  return sequelize.define<LogItemInstance>(
    'LogItems',
    {
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
      }
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true
    }
  )
}
