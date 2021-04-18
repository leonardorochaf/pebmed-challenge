import { DefaultPatientResponse } from '../../dtos/patient/default-patient-response'
import { IGetPatientByIdRepository } from '../../repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IUpdatePatientUsecase, UpdatePatientParams } from './interface/update-patient.usecase.interface'

export class UpdatePatientUsecase implements IUpdatePatientUsecase {
  constructor (
    private readonly getPatientByIdRepository: IGetPatientByIdRepository
  ) { }

  async execute (patientId: string, params: UpdatePatientParams): Promise<DefaultPatientResponse> {
    await this.getPatientByIdRepository.getById(patientId)

    return Promise.resolve(null)
  }
}
