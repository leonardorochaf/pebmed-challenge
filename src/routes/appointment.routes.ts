import { Router } from 'express'

import { createAppointmentFactory } from '../factories/appointment/create-appointment.factory'

const router = Router()

router.post('/', (req, res) => {
  createAppointmentFactory().handle(req, res)
})

export default router
