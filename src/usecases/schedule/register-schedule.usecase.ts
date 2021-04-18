import { DefaultScheduleResponse } from '../../dtos/schedule/default-schedule-response'
import { IGetScheduleByTimeRepository } from '../../repositories/schedule/interfaces/get-schedule-by-time.reposioty.interface'
import { IRegisterScheduleUsecase, RegisterScheduleParams } from './interfaces/register-schedule.usecase.interface'

export class RegisterScheduleUsecase implements IRegisterScheduleUsecase {
  constructor (
    private readonly getScheduleByTimeRepository: IGetScheduleByTimeRepository
  ) { }

  async execute (params: RegisterScheduleParams): Promise<DefaultScheduleResponse> {
    await this.getScheduleByTimeRepository.getByTime(params.time)

    return Promise.resolve(null)
  }
}
