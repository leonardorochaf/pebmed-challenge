import { DefaultPatientResponse } from '../../dtos/patient/default-patient-response'
import { IGetPatientByIdRepository } from '../../repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IGetPatientByIdUsecase } from './interface/get-patient-by-id.usecase.interface'

export class GetPatientByIdUsecase implements IGetPatientByIdUsecase {
  constructor (private readonly getPatientByIdRepository: IGetPatientByIdRepository) { }

  async execute (patientId: string): Promise<DefaultPatientResponse> {
    await this.getPatientByIdRepository.getById(patientId)

    return Promise.resolve(null)
  }
}
