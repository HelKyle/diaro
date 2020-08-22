import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'
import { app } from 'electron'

if (process.env.NODE_ENV === 'production') {
  require.context('./migrations', true, /\.ts$/)
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: app.getPath('userData') + '/database.sqlite'
}) as any

const umzug = new Umzug({
  migrations: {
    path: './app/migrations',
    customResolver:
      process.env.NODE_ENV === 'production'
        ? function (filePath) {
            return __webpack_require__(filePath.replace(/^.*\/app\//, './app/'))
          }
        : undefined,
    pattern: /\.ts$/,
    params: [sequelize.getQueryInterface()]
  },
  storage: new SequelizeStorage({ sequelize })
})

export const runMigrations = async () => {
  await umzug.up()
}
