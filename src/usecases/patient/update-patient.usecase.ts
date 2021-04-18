import { DefaultPatientResponse } from '../../dtos/patient/default-patient-response'
import { PatientNotFoundError } from '../../errors/patient-not-found-error'
import { IGetPatientByEmailRepository } from '../../repositories/patient/interfaces/get-patient-by-email.repository.interface'
import { IGetPatientByIdRepository } from '../../repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IUpdatePatientUsecase, UpdatePatientParams } from './interface/update-patient.usecase.interface'

export class UpdatePatientUsecase implements IUpdatePatientUsecase {
  constructor (
    private readonly getPatientByIdRepository: IGetPatientByIdRepository,
    private readonly getPatientByEmailRepository: IGetPatientByEmailRepository
  ) { }

  async execute (patientId: string, params: UpdatePatientParams): Promise<DefaultPatientResponse> {
    const patientById = await this.getPatientByIdRepository.getById(patientId)
    if (!patientById) {
      throw new PatientNotFoundError()
    }

    return Promise.resolve(null)
  }
}
