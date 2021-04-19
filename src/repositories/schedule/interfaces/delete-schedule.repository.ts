export interface IDeleteScheduleRepository {
  deleteById: (scheduleId: string) => Promise<void>
}
