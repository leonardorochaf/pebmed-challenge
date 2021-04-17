import { Patient } from '../../../models/Patient'

export interface IGetPatientByIdRepository {
  getById: (patientId: string) => Promise<Patient>
}
