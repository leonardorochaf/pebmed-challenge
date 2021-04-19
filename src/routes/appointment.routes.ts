import { Router } from 'express'

import { createAppointmentFactory } from '../factories/appointment/create-appointment.factory'
import { getAllAppointmentsByPatientFactory } from '../factories/appointment/get-all-appointments-by-patient.factory'

const router = Router()

router.post('/', (req, res) => {
  createAppointmentFactory().handle(req, res)
})

router.get('/patient/:patientId', (req, res) => {
  getAllAppointmentsByPatientFactory().handle(req, res)
})

export default router
