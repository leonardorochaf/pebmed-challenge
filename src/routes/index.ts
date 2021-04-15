import { Express } from 'express'

import { apiPath } from '../utils/strings'
import authRoutes from '../routes/auth.routes'
import patientRoutes from '../routes/patient.routes'

export default (app: Express): void => {
  app.use(apiPath + '/auth', authRoutes)
  app.use(apiPath + '/patients', patientRoutes)
}
