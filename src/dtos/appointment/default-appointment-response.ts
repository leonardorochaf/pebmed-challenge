export type DefaultAppointmentResponse = {
  id: string
  observation: string
  schedule: ScheduleWithoutPatientResponse
}

export type ScheduleWithoutPatientResponse = {
  id: string
  time: Date
}
