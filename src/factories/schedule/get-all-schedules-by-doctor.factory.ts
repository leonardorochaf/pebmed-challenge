import { getCustomRepository } from 'typeorm'
import { GetAllSchedulesByDoctorController } from '../../controllers/schedule/get-all-schedules-by-doctor.controller'
import { ScheduleRepository } from '../../repositories/schedule/schedule.repository'
import { JwtService } from '../../services/jwt/jwt.service'
import { GetAllSchedulesByDoctorUsecase } from '../../usecases/schedule/get-all-schedules-by-doctor.usecase'

export const getAllSchedulesByDoctorFactory = (): GetAllSchedulesByDoctorController => {
  const scheduleRepository = getCustomRepository(ScheduleRepository, process.env.NODE_ENV)
  const jwtService = new JwtService()
  const getAllSchedulesByDoctorUsecase = new GetAllSchedulesByDoctorUsecase(jwtService, scheduleRepository)
  return new GetAllSchedulesByDoctorController(getAllSchedulesByDoctorUsecase)
}
