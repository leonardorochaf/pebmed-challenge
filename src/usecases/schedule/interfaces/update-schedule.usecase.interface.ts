import { DefaultScheduleResponse } from '../../../dtos/schedule/default-schedule-response'

export interface IUpdateScheduleUsecase {
  execute: (scheduleId: string, params: UpdateScheduleParams) => Promise<DefaultScheduleResponse>
}

export type UpdateScheduleParams = {
  time: Date
}
