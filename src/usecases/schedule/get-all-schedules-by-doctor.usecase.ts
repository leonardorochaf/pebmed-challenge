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

    const allSchedules = await this.getAllSchedulesByDoctorRepository.getAllByDoctor(doctorId)

    const response = allSchedules.map(({ createdAt, updatedAt, doctor, ...response }) => {
      delete response.patient.createdAt
      delete response.patient.updatedAt
      delete response.patient.deletedAt

      return response
    })

    return response
  }
}
