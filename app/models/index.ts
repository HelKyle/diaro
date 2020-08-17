// Create database connection
import { Sequelize } from 'sequelize'
import LogItems from './LogItems'
import { remote } from 'electron'

const { app } = remote

export * from './LogItems'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: app.getPath('userData') + '/database.sqlite'
})

export default {
  logItems: LogItems(sequelize)
}
