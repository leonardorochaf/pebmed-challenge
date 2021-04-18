import { getCustomRepository } from 'typeorm'

import { DeletePatientController } from '../../controllers/patient/delete-patient.controller'
import { PatientRepository } from '../../repositories/patient/patient.repository'
import { DeletePatientUsecase } from '../../usecases/patient/delete-patient.usecase'

export const deletePatientFactory = (): DeletePatientController => {
  const patientRepository = getCustomRepository(PatientRepository, process.env.NODE_ENV)
  const deletePatientUsecase = new DeletePatientUsecase(patientRepository, patientRepository)
  return new DeletePatientController(deletePatientUsecase)
}
