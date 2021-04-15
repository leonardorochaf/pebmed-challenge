import { Doctor } from '../../../models/Doctor'

export interface IGetDoctorByEmailRepository {
  getByEmail: (email: string) => Promise<Doctor>
}
