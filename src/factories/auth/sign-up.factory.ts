import { getCustomRepository } from 'typeorm'

import { SignUpController } from '../../controllers/auth/sign-up.controller'
import { DoctorRepository } from '../../repositories/doctor/doctor.repository'
import { BCryptService } from '../../services/cryptography/bcrypt.service'
import { SignUpUsecase } from '../../usecases/auth/sign-up.usecase'
import { Validator } from '../../validation/validator'

export const signUpFactory = (): SignUpController => {
  const doctorRepositoru = getCustomRepository(DoctorRepository, process.env.NODE_ENV)
  const hasher = new BCryptService()
  const signUpUsecase = new SignUpUsecase(doctorRepositoru, hasher, doctorRepositoru)
  const validator = new Validator()
  return new SignUpController(validator, signUpUsecase)
}
