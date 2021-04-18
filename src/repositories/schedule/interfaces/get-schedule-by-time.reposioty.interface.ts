import { Schedule } from '../../../models/Schedule'

export interface IGetScheduleByTimeRepository {
  getByTime: (time: Date) => Promise<Schedule>
}
