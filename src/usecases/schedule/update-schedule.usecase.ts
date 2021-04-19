import { DefaultScheduleResponse } from '../../dtos/schedule/default-schedule-response'
import { IGetScheduleByIdRepository } from '../../repositories/schedule/interfaces/get-schedule-by-id.repository'
import { IUpdateScheduleUsecase, UpdateScheduleParams } from './interfaces/update-schedule.usecase.interface'

export class UpdateScheduleUsecase implements IUpdateScheduleUsecase {
  constructor (
    private readonly getScheduleByIdRepository: IGetScheduleByIdRepository
  ) { }

  async execute (scheduleId: string, params: UpdateScheduleParams): Promise<DefaultScheduleResponse> {
    await this.getScheduleByIdRepository.getById(scheduleId)

    return Promise.resolve(null)
  }
}
