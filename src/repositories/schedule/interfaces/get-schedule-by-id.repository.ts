import { Schedule } from '../../../models/Schedule'

export interface IGetScheduleByIdRepository {
  getById: (scheduleId: string) => Promise<Schedule>
}
