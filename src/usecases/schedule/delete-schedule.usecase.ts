import { IGetScheduleByIdRepository } from '../../repositories/schedule/interfaces/get-schedule-by-id.repository'
import { IDeleteScheduleUsecase } from './interfaces/delete-schedule.usecase.interface'

export class DeleteScheduleUsecase implements IDeleteScheduleUsecase {
  constructor (
    private readonly getScheduleByIdRepository: IGetScheduleByIdRepository
  ) { }

  async execute (scheduleId: string): Promise<void> {
    await this.getScheduleByIdRepository.getById(scheduleId)
  }
}
