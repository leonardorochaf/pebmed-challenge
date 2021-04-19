import { DefaultScheduleResponse } from '../schedule/default-schedule-response'

export type DefaultAppointmentResponse = {
  id: string
  observation: string
  schedule: DefaultScheduleResponse
}
