import { Patient } from '../../../models/Patient'

export interface IGetPatientByEmailRepository {
  getByEmail: (email: string) => Promise<Patient>
}
