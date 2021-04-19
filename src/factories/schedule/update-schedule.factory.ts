import { getCustomRepository } from 'typeorm'
import { UpdateScheduleController } from '../../controllers/schedule/update-schedule.controller'
import { ScheduleRepository } from '../../repositories/schedule/schedule.repository'
import { UpdateScheduleUsecase } from '../../usecases/schedule/update-schedule.usecase'
import { Validator } from '../../validation/validator'

export const updateScheduleFactory = (): UpdateScheduleController => {
  const scheduleRepository = getCustomRepository(ScheduleRepository, process.env.NODE_ENV)
  const updateScheduleUsecase = new UpdateScheduleUsecase(scheduleRepository, scheduleRepository, scheduleRepository)
  const validator = new Validator()
  return new UpdateScheduleController(validator, updateScheduleUsecase)
}
