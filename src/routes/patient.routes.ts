import { Router } from 'express'

import { createPatientFactory } from '../factories/patient/create-patient.factory'
import { deletePatientFactory } from '../factories/patient/delete-patient.factory'
import { getAllPatientsFactory } from '../factories/patient/get-all-patients.factory'
import { getPatientByIdFactory } from '../factories/patient/get-patient-by-id.factory'

const router = Router()

router.post('/', (req, res) => {
  createPatientFactory().handle(req, res)
})

router.get('/', (req, res) => {
  getAllPatientsFactory().handle(req, res)
})

router.get('/:id/', (req, res) => {
  getPatientByIdFactory().handle(req, res)
})

router.delete('/:id', (req, res) => {
  deletePatientFactory().handle(req, res)
})

export default router
