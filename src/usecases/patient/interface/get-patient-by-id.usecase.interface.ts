import { DefaultPatientResponse } from '../../../dtos/patient/default-patient-response'

export interface IGetPatientByIdUsecase {
  execute: (patientId: string) => Promise<DefaultPatientResponse>
}
