import { DefaultAppointmentResponse } from '../../dtos/appointment/default-appointment-response'
import { IGetAllAppointmentsByPatientRepository } from '../../repositories/appointment/interfaces/get-all-appointments-by-patient.repository.interface'
import { IGetAllAppointmentsByPatientUsecase } from './interfaces/get-all-appointments-by-patient.usecase.interface'

export class GetAllAppointmentsByPatientUsecase implements IGetAllAppointmentsByPatientUsecase {
  constructor (private readonly getAllAppointmentsByPatientRepository: IGetAllAppointmentsByPatientRepository) { }

  async execute (patientId: string): Promise<DefaultAppointmentResponse[]> {
    const allAppointmentsByPatient = await this.getAllAppointmentsByPatientRepository.getAllByPatient(patientId)

    const response = allAppointmentsByPatient.map(({ createdAt, ...response }) => {
      delete response.schedule.createdAt
      delete response.schedule.updatedAt
      delete response.schedule.doctor
      delete response.schedule.patient.createdAt
      delete response.schedule.patient.updatedAt
      delete response.schedule.patient.deletedAt

      return response
    })

    return response
  }
}
