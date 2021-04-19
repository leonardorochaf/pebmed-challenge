import { DefaultAppointmentResponse } from '../../dtos/appointment/default-appointment-response'
import { IGetAllAppointmentsByPatientRepository } from '../../repositories/appointment/interfaces/get-all-appointments-by-patient.repository.interface'
import { IGetAllAppointmentsByPatientUsecase } from './interfaces/get-all-appointments-by-patient.usecase.interface'

export class GetAllAppointmentsByPatientUsecase implements IGetAllAppointmentsByPatientUsecase {
  constructor (private readonly getAllAppointmentsByPatientRepository: IGetAllAppointmentsByPatientRepository) { }

  async execute (patientId: string): Promise<DefaultAppointmentResponse[]> {
    await this.getAllAppointmentsByPatientRepository.getAllByPatient(patientId)

    return Promise.resolve(null)
  }
}
