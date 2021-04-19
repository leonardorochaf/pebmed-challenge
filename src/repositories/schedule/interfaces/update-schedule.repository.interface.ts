import { Schedule } from '../../../models/Schedule'

export interface IUpdateScheduleRepository {
  updateAndReload: (scheduleId: string, data: UpdateScheduleData) => Promise<Schedule>
}

export type UpdateScheduleData = {
  time: Date
}
