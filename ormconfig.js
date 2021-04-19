const { SnakeNamingStrategy } = require('typeorm-naming-strategies')

module.exports = [
  {
    name: 'dev',
    type: 'mysql',
    host: 'mysqldb',
    username: process.env.MYSQL_ROOT_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
      './dist/models/*.js'
    ],
    migrations: [
      './dist/database/migrations/*.js'
    ]
  },
  {
    name: 'test',
    type: 'mysql',
    host: 'localhost',
    username: process.env.MYSQL_ROOT_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: process.env.MYSQL_LOCAL_PORT,
    database: 'pebmed_test',
    migrationsRun: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
      './src/models/*.ts'
    ],
    migrations: [
      './src/database/migrations/*.ts'
    ]
  }
]
