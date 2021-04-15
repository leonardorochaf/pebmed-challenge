import { DefaultPatientResponse } from '../../dtos/patient/default-patient-response'
import { IGetAllPatientsRepository } from '../../repositories/patient/interfaces/get-all-patients.repository.interface'
import { IGetAllPatientsUsecase } from './interface/get-all-patients.usecase.interface'

export class GetAllPatientsUsecase implements IGetAllPatientsUsecase {
  constructor (private readonly getAllPatientsRepository: IGetAllPatientsRepository) { }

  async execute (): Promise<DefaultPatientResponse[]> {
    await this.getAllPatientsRepository.getAll()

    return Promise.resolve(null)
  }
}
