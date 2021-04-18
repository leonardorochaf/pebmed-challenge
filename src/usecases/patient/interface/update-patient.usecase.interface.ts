import { DefaultPatientResponse } from '../../../dtos/patient/default-patient-response'
import { Gender } from '../../../utils/gender-enum'

export interface IUpdatePatientUsecase {
  execute: (patientId: string, params: UpdatePatientParams) => Promise<DefaultPatientResponse>
}

export type UpdatePatientParams = {
  name?: string
  phone?: string
  email?: string
  birthday?: Date
  gender?: Gender
  height?: number
  weight?: number
}
