import { IGetPatientByIdRepository } from '../../repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IDeletePatientUsecase } from './interface/delete-patient.usecase.interface'

export class DeletePatientUsecase implements IDeletePatientUsecase {
  constructor (
    private readonly getPatientByIdRepository: IGetPatientByIdRepository
  ) { }

  async execute (patientId: string): Promise<void> {
    await this.getPatientByIdRepository.getById(patientId)
  }
}
