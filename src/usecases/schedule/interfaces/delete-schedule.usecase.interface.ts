export interface IDeleteScheduleUsecase {
  execute: (scheduleId: string) => Promise<void>
}
