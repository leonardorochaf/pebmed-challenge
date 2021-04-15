import { getCustomRepository } from 'typeorm'
import { LoginController } from '../../controllers/auth/login.controller'
import { DoctorRepository } from '../../repositories/doctor/doctor.repository'
import { SessionRepository } from '../../repositories/session/session.repository'
import { BCryptService } from '../../services/cryptography/bcrypt.service'
import { JwtService } from '../../services/jwt/jwt.service'
import { LoginUsecase } from '../../usecases/auth/login.usecase'
import { Validator } from '../../validation/validator'

export const loginFactory = (): LoginController => {
  const jwtService = new JwtService()
  const bcryptService = new BCryptService()
  const sessionRepository = getCustomRepository(SessionRepository, process.env.NODE_ENV)
  const doctorRepository = getCustomRepository(DoctorRepository, process.env.NODE_ENV)
  const loginUsecase = new LoginUsecase(doctorRepository, bcryptService, jwtService, sessionRepository)
  const validator = new Validator()
  return new LoginController(validator, loginUsecase)
}
