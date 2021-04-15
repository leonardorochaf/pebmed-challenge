import { DefaultPatientResponse } from '../../../dtos/patient/default-patient-response'

export interface IGetAllPatientsUsecase {
  execute: () => Promise<DefaultPatientResponse[]>
}
