/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { createPatientFactory } from '../factories/patient/create-patient.factory'
import { deletePatientFactory } from '../factories/patient/delete-patient.factory'
import { getAllPatientsFactory } from '../factories/patient/get-all-patients.factory'
import { getPatientByIdFactory } from '../factories/patient/get-patient-by-id.factory'
import { updatePatientFactory } from '../factories/update-patient.factory'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/', authMiddleware, (req, res) => {
  createPatientFactory().handle(req, res)
})

router.get('/', authMiddleware, (req, res) => {
  getAllPatientsFactory().handle(req, res)
})

router.get('/:id/', authMiddleware, (req, res) => {
  getPatientByIdFactory().handle(req, res)
})

router.put('/:id', (req, res) => {
  updatePatientFactory().handle(req, res)
})

router.delete('/:id', authMiddleware, (req, res) => {
  deletePatientFactory().handle(req, res)
})

export default router
