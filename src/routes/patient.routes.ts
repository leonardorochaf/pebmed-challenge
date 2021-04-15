import { Router } from 'express'
import { createPatientFactory } from '../factories/patient/create-patient.factory'

const router = Router()

router.post('/', (req, res) => {
  createPatientFactory().handle(req, res)
})

export default router
