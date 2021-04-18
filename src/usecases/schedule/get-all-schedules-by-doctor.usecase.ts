import { IDecodeToken } from '../../services/jwt/interfaces/decode-token.interface'
import { DefaultScheduleResponse } from '../../dtos/schedule/default-schedule-response'
import { IGetAllSchedulesByDoctorUsecase } from './interfaces/get-all-schedules-by-doctor.usecase.interface'

export class GetAllSchedulesByDoctorUsecase implements IGetAllSchedulesByDoctorUsecase {
  constructor (
    private readonly decodeToken: IDecodeToken
  ) { }

  async execute (token: string): Promise<DefaultScheduleResponse[]> {
    await this.decodeToken.decode(token)

    return Promise.resolve(null)
  }
}
