import { getCustomRepository } from 'typeorm'
import { DeleteScheduleController } from '../../controllers/schedule/delete-schedule.controller'
import { ScheduleRepository } from '../../repositories/schedule/schedule.repository'
import { DeleteScheduleUsecase } from '../../usecases/schedule/delete-schedule.usecase'

export const deleteScheduleFactory = (): DeleteScheduleController => {
  const scheduleRepository = getCustomRepository(ScheduleRepository, process.env.NODE_ENV)
  const deleteScheduleUsecase = new DeleteScheduleUsecase(scheduleRepository, scheduleRepository)
  return new DeleteScheduleController(deleteScheduleUsecase)
}
