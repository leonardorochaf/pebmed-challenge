import { DefaultScheduleResponse } from '../../../dtos/schedule/default-schedule-response'

export interface IGetAllSchedulesByDoctorUsecase {
  execute: (token: string) => Promise<DefaultScheduleResponse[]>
}
