import { DefaultAppointmentResponse } from '../../../dtos/appointment/default-appointment-response'

export interface IGetAllAppointmentsByPatientUsecase {
  execute: (patientId: string) => Promise<DefaultAppointmentResponse[]>
}
