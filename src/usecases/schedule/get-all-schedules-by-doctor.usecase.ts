import { IDecodeToken } from '../../services/jwt/interfaces/decode-token.interface'
import { DefaultScheduleResponse } from '../../dtos/schedule/default-schedule-response'
import { IGetAllSchedulesByDoctorUsecase } from './interfaces/get-all-schedules-by-doctor.usecase.interface'
import { IGetAllSchedulesByDoctorRepository } from '../../repositories/schedule/interfaces/get-all-schedules-by-doctor.repository.interface'

export class GetAllSchedulesByDoctorUsecase implements IGetAllSchedulesByDoctorUsecase {
  constructor (
    private readonly decodeToken: IDecodeToken,
    private readonly getAllSchedulesByDoctorRepository: IGetAllSchedulesByDoctorRepository
  ) { }

  async execute (token: string): Promise<DefaultScheduleResponse[]> {
    const doctorId = await this.decodeToken.decode(token)

    await this.getAllSchedulesByDoctorRepository.getAllByDoctor(doctorId)
    return Promise.resolve(null)
  }
}
