import { getCustomRepository } from 'typeorm'

import { GetPatientByIdController } from '../../controllers/patient/get-patient-by-id.controller'
import { PatientRepository } from '../../repositories/patient/patient.repository'
import { GetPatientByIdUsecase } from '../../usecases/patient/get-patient-by-id.usecase'

export const getPatientByIdFactory = (): GetPatientByIdController => {
  const patientRepository = getCustomRepository(PatientRepository, process.env.NODE_ENV)
  const getPatientByIdUsecase = new GetPatientByIdUsecase(patientRepository)
  return new GetPatientByIdController(getPatientByIdUsecase)
}
