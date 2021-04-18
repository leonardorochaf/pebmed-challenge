import { DefaultPatientResponse } from '../patient/default-patient-response'

export type DefaultScheduleResponse = {
  id: string
  time: Date
  patient: DefaultPatientResponse
}
