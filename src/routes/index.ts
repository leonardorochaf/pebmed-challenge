import { Express } from 'express'

import { apiPath } from '../utils/strings'
import authRoutes from '../routes/auth.routes'

export default (app: Express): void => {
  app.use(apiPath + '/auth', authRoutes)
}
