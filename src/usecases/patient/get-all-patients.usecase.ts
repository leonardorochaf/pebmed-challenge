import { DefaultPatientResponse } from '../../dtos/patient/default-patient-response'
import { IGetAllPatientsRepository } from '../../repositories/patient/interfaces/get-all-patients.repository.interface'
import { IGetAllPatientsUsecase } from './interface/get-all-patients.usecase.interface'

export class GetAllPatientsUsecase implements IGetAllPatientsUsecase {
  constructor (private readonly getAllPatientsRepository: IGetAllPatientsRepository) { }

  async execute (): Promise<DefaultPatientResponse[]> {
    const allPatients = await this.getAllPatientsRepository.getAll()

    const response = allPatients.map(({ createdAt, updatedAt, deletedAt, ...response }) => response)
    return response
  }
}
