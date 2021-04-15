import { createConnection, getConnection } from 'typeorm'

const connectionHelper = {
  async create () {
    await createConnection(process.env.NODE_ENV)
  },

  async close () {
    await getConnection(process.env.NODE_ENV).close()
  },

  async clear () {
    const connection = getConnection(process.env.NODE_ENV)
    const entities = connection.entityMetadatas

    const entityDeletionPromises = entities.map(async (entity) => {
      const repository = connection.getRepository(entity.name)
      await repository.query('SET FOREIGN_KEY_CHECKS = 0;')
      await repository.clear()
      await repository.query('SET FOREIGN_KEY_CHECKS = 1;')
    })
    await Promise.all(entityDeletionPromises)
  }
}

export default connectionHelper
