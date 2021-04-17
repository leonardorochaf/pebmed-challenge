import { DefaultPatientResponse } from '../../dtos/patient/default-patient-response'
import { PatientNotFoundError } from '../../errors/patient-not-found-error'
import { IGetPatientByIdRepository } from '../../repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IGetPatientByIdUsecase } from './interface/get-patient-by-id.usecase.interface'

export class GetPatientByIdUsecase implements IGetPatientByIdUsecase {
  constructor (private readonly getPatientByIdRepository: IGetPatientByIdRepository) { }

  async execute (patientId: string): Promise<DefaultPatientResponse> {
    const patientById = await this.getPatientByIdRepository.getById(patientId)
    if (!patientById) {
      throw new PatientNotFoundError()
    }

    return Promise.resolve(null)
  }
}
