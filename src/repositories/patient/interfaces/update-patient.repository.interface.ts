import { Patient } from '../../../models/Patient'
import { Gender } from '../../../utils/gender-enum'

export interface IUpdatePatientRepository {
  updateAndReload: (patientId: string, params: UpdatePatientRepositoryParams) => Promise<Patient>
}

export type UpdatePatientRepositoryParams = {
  name?: string
  phone?: string
  email?: string
  birthday?: Date
  gender?: Gender
  height?: number
  weight?: number
}
