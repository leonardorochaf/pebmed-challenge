const { SnakeNamingStrategy } = require('typeorm-naming-strategies')

module.exports = [
  {
    name: 'dev',
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'pebmed',
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
      './src/models/*.ts'
    ],
    migrations: [
      './src/database/migrations/*.ts'
    ]
  },
  {
    name: 'test',
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'pebmed-test',
    dropSchema: true,
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
