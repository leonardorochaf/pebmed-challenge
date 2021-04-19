export interface ICreateAppointmentUsecase {
  execute: (params: CreateAppointmentParams) => Promise<void>
}

export type CreateAppointmentParams = {
  observation: string
  scheduleId: string
}
