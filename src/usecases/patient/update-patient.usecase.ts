import { DefaultPatientResponse } from '../../dtos/patient/default-patient-response'
import { EmailAlreadyInUseError } from '../../errors/email-already-in-use-error'
import { PatientNotFoundError } from '../../errors/patient-not-found-error'
import { IGetPatientByEmailRepository } from '../../repositories/patient/interfaces/get-patient-by-email.repository.interface'
import { IGetPatientByIdRepository } from '../../repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IUpdatePatientRepository } from '../../repositories/patient/interfaces/update-patient.repository.interface'
import { IUpdatePatientUsecase, UpdatePatientParams } from './interface/update-patient.usecase.interface'

export class UpdatePatientUsecase implements IUpdatePatientUsecase {
  constructor (
    private readonly getPatientByIdRepository: IGetPatientByIdRepository,
    private readonly getPatientByEmailRepository: IGetPatientByEmailRepository,
    private readonly updatePatientRepository: IUpdatePatientRepository
  ) { }

  async execute (patientId: string, params: UpdatePatientParams): Promise<DefaultPatientResponse> {
    const patientById = await this.getPatientByIdRepository.getById(patientId)
    if (!patientById) {
      throw new PatientNotFoundError()
    }

    if (params.email) {
      const patientByEmail = await this.getPatientByEmailRepository.getByEmail(params.email)
      if (patientByEmail) {
        throw new EmailAlreadyInUseError()
      }
    }

    await this.updatePatientRepository.updateAndReload(patientId, params)

    return Promise.resolve(null)
  }
}
