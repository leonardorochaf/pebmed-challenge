import { DefaultPatientResponse } from '../../../dtos/patient/default-patient-response'
import { Gender } from '../../../utils/gender-enum'

export interface ICreatePatientUsecase {
  execute: (params: CreatePatientParams) => Promise<DefaultPatientResponse>
}

export type CreatePatientParams = {
  name: string
  phone: string
  email: string
  birthday: Date
  gender: Gender
  height: number
  weight: number
}
