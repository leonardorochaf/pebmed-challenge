import { getCustomRepository } from 'typeorm'

import { UpdatePatientController } from '../controllers/patient/update-patient.controller'
import { PatientRepository } from '../repositories/patient/patient.repository'
import { UpdatePatientUsecase } from '../usecases/patient/update-patient.usecase'
import { Validator } from '../validation/validator'

export const updatePatientFactory = (): UpdatePatientController => {
  const patientRepository = getCustomRepository(PatientRepository, process.env.NODE_ENV)
  const updatePatientUsecase = new UpdatePatientUsecase(patientRepository, patientRepository, patientRepository)
  const validator = new Validator()
  return new UpdatePatientController(validator, updatePatientUsecase)
}
