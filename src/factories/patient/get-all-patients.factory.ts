import { getCustomRepository } from 'typeorm'
import { GetAllPatientsController } from '../../controllers/patient/get-all-patients.controller'
import { PatientRepository } from '../../repositories/patient/patient.repository'
import { GetAllPatientsUsecase } from '../../usecases/patient/get-all-patients.usecase'

export const getAllPatientsFactory = (): GetAllPatientsController => {
  const patientRepository = getCustomRepository(PatientRepository, process.env.NODE_ENV)
  const getAllPatientsUsecase = new GetAllPatientsUsecase(patientRepository)
  return new GetAllPatientsController(getAllPatientsUsecase)
}
