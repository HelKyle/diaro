import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage, migrationsList } from 'umzug'
import { app } from 'electron'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: app.getPath('userData') + '/database.sqlite'
}) as any

const umzug = new Umzug({
  migrations: migrationsList(
    [
      {
        name: '20200813-initial.ts',
        ...require('./migrations/20200813-initial.ts').default
      }
    ],
    [sequelize.getQueryInterface()]
  ),
  storage: new SequelizeStorage({ sequelize })
})

export const runMigrations = async () => {
  await umzug.up()
}
