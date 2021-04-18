import { PatientNotFoundError } from '../../errors/patient-not-found-error'
import { IDeletePatientRepository } from '../../repositories/patient/interfaces/delete-patient.repository.interface'
import { IGetPatientByIdRepository } from '../../repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IDeletePatientUsecase } from './interface/delete-patient.usecase.interface'

export class DeletePatientUsecase implements IDeletePatientUsecase {
  constructor (
    private readonly getPatientByIdRepository: IGetPatientByIdRepository,
    private readonly deletePatientRepository: IDeletePatientRepository
  ) { }

  async execute (patientId: string): Promise<void> {
    const patientById = await this.getPatientByIdRepository.getById(patientId)
    if (!patientById) {
      throw new PatientNotFoundError()
    }

    await this.deletePatientRepository.logicalDelete(patientId)
  }
}
