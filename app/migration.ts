import path from 'path'
import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'
import { app } from 'electron'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: app.getPath('appData') + '/database.sqlite'
}) as any

const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, './migrations'),
    params: [sequelize.getQueryInterface()]
  },
  storage: new SequelizeStorage({ sequelize })
})

export const runMigrations = async () => {
  await umzug.up()
}
