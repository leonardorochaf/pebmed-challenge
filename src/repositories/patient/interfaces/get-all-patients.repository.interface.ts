import { Patient } from '../../../models/Patient'

export interface IGetAllPatientsRepository {
  getAll: () => Promise<Patient[]>
}
