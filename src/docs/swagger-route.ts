import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { noCache } from '../middlewares/no-cache.middleware'

import swaggerConfig from './swagger-config'

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(swaggerConfig))
}
