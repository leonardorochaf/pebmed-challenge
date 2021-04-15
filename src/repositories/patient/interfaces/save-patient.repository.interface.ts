import { Patient } from '../../../models/Patient'
import { Gender } from '../../../utils/gender-enum'

export interface ISavePatientRepository {
  createAndSave: (params: SavePatientData) => Promise<Patient>
}

export type SavePatientData = {
  name: string
  phone: string
  email: string
  birthday: Date
  gender: Gender
  height: number
  weight: number
}
