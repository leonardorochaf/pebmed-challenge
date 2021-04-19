export interface ISaveAppointmentRepository {
  createAndSave: (params: SaveAppointmentParams) => Promise<void>
}

export type SaveAppointmentParams = {
  observation: string
  scheduleId: string
}
