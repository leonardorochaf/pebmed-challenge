import { DefaultScheduleResponse } from '../../dtos/schedule/default-schedule-response'
import { ScheduleNotFoundError } from '../../errors/schedule-not-found-error'
import { ScheduleTimeAlreadyTakenError } from '../../errors/schedule-time-already-taken-error'
import { IGetScheduleByIdRepository } from '../../repositories/schedule/interfaces/get-schedule-by-id.repository'
import { IGetScheduleByTimeRepository } from '../../repositories/schedule/interfaces/get-schedule-by-time.reposioty.interface'
import { IUpdateScheduleRepository } from '../../repositories/schedule/interfaces/update-schedule.repository.interface'
import { IUpdateScheduleUsecase, UpdateScheduleParams } from './interfaces/update-schedule.usecase.interface'

export class UpdateScheduleUsecase implements IUpdateScheduleUsecase {
  constructor (
    private readonly getScheduleByIdRepository: IGetScheduleByIdRepository,
    private readonly getSchedyleByTimeRepository: IGetScheduleByTimeRepository,
    private readonly updateScheduleRepository: IUpdateScheduleRepository
  ) { }

  async execute (scheduleId: string, params: UpdateScheduleParams): Promise<DefaultScheduleResponse> {
    const scheduleById = await this.getScheduleByIdRepository.getById(scheduleId)
    if (!scheduleById) {
      throw new ScheduleNotFoundError()
    }

    const scheduleByTime = await this.getSchedyleByTimeRepository.getByTime(params.time)
    if (scheduleByTime) {
      throw new ScheduleTimeAlreadyTakenError()
    }

    await this.updateScheduleRepository.updateAndReload(scheduleId, params)
    return Promise.resolve(null)
  }
}
