import { DefaultPatientResponse } from '../../dtos/patient/default-patient-response'
import { IGetPatientByEmailRepository } from '../../repositories/patient/interfaces/get-patient-by-email.repository.interface'
import { CreatePatientParams, ICreatePatientUsecase } from './interface/create-patient.usecase.interface'

export class CreatePatientUsecase implements ICreatePatientUsecase {
  constructor (
    private readonly getPatientByEmailRepository: IGetPatientByEmailRepository
  ) { }

  async execute (params: CreatePatientParams): Promise<DefaultPatientResponse> {
    await this.getPatientByEmailRepository.getByEmail(params.email)

    return Promise.resolve(null)
  }
}
