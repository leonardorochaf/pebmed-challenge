import { Appointment } from '../../../models/Appointment'

export interface IGetAllAppointmentsByPatientRepository {
  getAllByPatient: (patientId: string) => Promise<Appointment[]>
}
