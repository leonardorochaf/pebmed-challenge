import { DefaultPatientResponse } from '../../dtos/patient/default-patient-response'
import { EmailAlreadyInUseError } from '../../errors/email-already-in-use-error'
import { IGetPatientByEmailRepository } from '../../repositories/patient/interfaces/get-patient-by-email.repository.interface'
import { CreatePatientParams, ICreatePatientUsecase } from './interface/create-patient.usecase.interface'

export class CreatePatientUsecase implements ICreatePatientUsecase {
  constructor (
    private readonly getPatientByEmailRepository: IGetPatientByEmailRepository
  ) { }

  async execute (params: CreatePatientParams): Promise<DefaultPatientResponse> {
    const patientByEmail = await this.getPatientByEmailRepository.getByEmail(params.email)
    if (patientByEmail) {
      throw new EmailAlreadyInUseError()
    }

    return Promise.resolve(null)
  }
}
