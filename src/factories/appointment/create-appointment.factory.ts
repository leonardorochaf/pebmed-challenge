import { getCustomRepository } from 'typeorm'
import { CreateAppointmentController } from '../../controllers/appointment/create-appointment.controller'
import { AppointmentRepository } from '../../repositories/appointment/appointment.repository'
import { CreateAppointmentUsecase } from '../../usecases/appointment/create-appointment.usecase'
import { Validator } from '../../validation/validator'

export const createAppointmentFactory = (): CreateAppointmentController => {
  const appointmentRepository = getCustomRepository(AppointmentRepository, process.env.NODE_ENV)
  const createAppointmentUsecase = new CreateAppointmentUsecase(appointmentRepository)
  const validator = new Validator()
  return new CreateAppointmentController(validator, createAppointmentUsecase)
}
