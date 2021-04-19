import { ScheduleNotFoundError } from '../../errors/schedule-not-found-error'
import { IDeleteScheduleRepository } from '../../repositories/schedule/interfaces/delete-schedule.repository'
import { IGetScheduleByIdRepository } from '../../repositories/schedule/interfaces/get-schedule-by-id.repository'
import { IDeleteScheduleUsecase } from './interfaces/delete-schedule.usecase.interface'

export class DeleteScheduleUsecase implements IDeleteScheduleUsecase {
  constructor (
    private readonly getScheduleByIdRepository: IGetScheduleByIdRepository,
    private readonly deleteScheduleRepository: IDeleteScheduleRepository
  ) { }

  async execute (scheduleId: string): Promise<void> {
    const scheduleById = await this.getScheduleByIdRepository.getById(scheduleId)
    if (!scheduleById) {
      throw new ScheduleNotFoundError()
    }

    await this.deleteScheduleRepository.deleteById(scheduleId)
  }
}
