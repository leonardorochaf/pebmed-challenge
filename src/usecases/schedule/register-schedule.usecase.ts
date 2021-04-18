import { DefaultScheduleResponse } from '../../dtos/schedule/default-schedule-response'
import { ScheduleTimeAlreadyTakenError } from '../../errors/schedule-time-already-taken-error'
import { IGetScheduleByTimeRepository } from '../../repositories/schedule/interfaces/get-schedule-by-time.reposioty.interface'
import { IRegisterScheduleUsecase, RegisterScheduleParams } from './interfaces/register-schedule.usecase.interface'

export class RegisterScheduleUsecase implements IRegisterScheduleUsecase {
  constructor (
    private readonly getScheduleByTimeRepository: IGetScheduleByTimeRepository
  ) { }

  async execute (params: RegisterScheduleParams): Promise<DefaultScheduleResponse> {
    const scheduleByTime = await this.getScheduleByTimeRepository.getByTime(params.time)
    if (scheduleByTime) {
      throw new ScheduleTimeAlreadyTakenError()
    }

    return Promise.resolve(null)
  }
}
