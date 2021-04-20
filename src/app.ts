import express from 'express'
import 'reflect-metadata'

import initRoutes from './routes'
import initSwagger from './docs/swagger-route'

const app = express()

initSwagger(app)
app.use(express.json())
initRoutes(app)

export default app
