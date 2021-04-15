import { getCustomRepository } from 'typeorm'

import { CreatePatientController } from '../../controllers/patient/create-patient.controller'
import { PatientRepository } from '../../repositories/patient/patient.repository'
import { CreatePatientUsecase } from '../../usecases/patient/create-patient.usecase'
import { Validator } from '../../validation/validator'

export const createPatientFactory = (): CreatePatientController => {
  const patientRepository = getCustomRepository(PatientRepository, process.env.NODE_ENV)
  const createPatientUsecase = new CreatePatientUsecase(patientRepository, patientRepository)
  const validator = new Validator()
  return new CreatePatientController(validator, createPatientUsecase)
}
