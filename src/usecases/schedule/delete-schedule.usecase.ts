import { ScheduleNotFoundError } from '../../errors/schedule-not-found-error'
import { IGetScheduleByIdRepository } from '../../repositories/schedule/interfaces/get-schedule-by-id.repository'
import { IDeleteScheduleUsecase } from './interfaces/delete-schedule.usecase.interface'

export class DeleteScheduleUsecase implements IDeleteScheduleUsecase {
  constructor (
    private readonly getScheduleByIdRepository: IGetScheduleByIdRepository
  ) { }

  async execute (scheduleId: string): Promise<void> {
    const scheduleById = await this.getScheduleByIdRepository.getById(scheduleId)
    if (!scheduleById) {
      throw new ScheduleNotFoundError()
    }
  }
}
