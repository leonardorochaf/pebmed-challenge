import { getCustomRepository } from 'typeorm'
import { GetAllAppointmentsByPatientController } from '../../controllers/appointment/get-all-appointments-by-patient'
import { AppointmentRepository } from '../../repositories/appointment/appointment.repository'
import { GetAllAppointmentsByPatientUsecase } from '../../usecases/appointment/get-all-appointments-by-patient.usecase'

export const getAllAppointmentsByPatientFactory = (): GetAllAppointmentsByPatientController => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository, process.env.NODE_ENV)
  const getAllAppointmentsByPatientUsecase = new GetAllAppointmentsByPatientUsecase(appointmentsRepository)
  return new GetAllAppointmentsByPatientController(getAllAppointmentsByPatientUsecase)
}
