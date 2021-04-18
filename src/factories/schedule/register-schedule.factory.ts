import { getCustomRepository } from 'typeorm'
import { RegisterScheduleController } from '../../controllers/schedule/register-schedule.controller'
import { PatientRepository } from '../../repositories/patient/patient.repository'
import { ScheduleRepository } from '../../repositories/schedule/schedule.repository'
import { JwtService } from '../../services/jwt/jwt.service'
import { RegisterScheduleUsecase } from '../../usecases/schedule/register-schedule.usecase'
import { Validator } from '../../validation/validator'

export const registerScheduleFactory = (): RegisterScheduleController => {
  const jwtService = new JwtService()
  const patientRepository = getCustomRepository(PatientRepository, process.env.NODE_ENV)
  const scheduleRepository = getCustomRepository(ScheduleRepository, process.env.NODE_ENV)
  const registerScheduleUsecase = new RegisterScheduleUsecase(scheduleRepository, patientRepository, jwtService, scheduleRepository)
  const validator = new Validator()
  return new RegisterScheduleController(validator, registerScheduleUsecase)
}
