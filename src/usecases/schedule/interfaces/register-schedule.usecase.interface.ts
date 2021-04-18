import { DefaultScheduleResponse } from '../../../dtos/schedule/default-schedule-response'

export interface IRegisterScheduleUsecase {
  execute: (params: RegisterScheduleParams) => Promise<DefaultScheduleResponse>
}

export type RegisterScheduleParams = {
  time: Date
  token: string
  patientId: string
}
