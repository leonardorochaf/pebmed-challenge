import express from 'express'
import 'reflect-metadata'

import initRoutes from './routes'

const app = express()

app.use(express.json())
initRoutes(app)

export default app
