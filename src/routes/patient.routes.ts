import { Router } from 'express'
import { createPatientFactory } from '../factories/patient/create-patient.factory'
import { getAllPatientsFactory } from '../factories/patient/get-all-patients.factory'

const router = Router()

router.post('/', (req, res) => {
  createPatientFactory().handle(req, res)
})

router.get('/', (req, res) => {
  getAllPatientsFactory().handle(req, res)
})

export default router
