/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { createAppointmentFactory } from '../factories/appointment/create-appointment.factory'
import { getAllAppointmentsByPatientFactory } from '../factories/appointment/get-all-appointments-by-patient.factory'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/', authMiddleware, (req, res) => {
  createAppointmentFactory().handle(req, res)
})

router.get('/patient/:patientId', authMiddleware, (req, res) => {
  getAllAppointmentsByPatientFactory().handle(req, res)
})

export default router
