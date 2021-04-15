import { Doctor } from '../../../models/Doctor'

export interface ISaveDoctorRepository {
  createAndSave: (data: SaveDoctorData) => Promise<Doctor>
}

export type SaveDoctorData = {
  name: string
  email: string
  hashedPassword: string
}
