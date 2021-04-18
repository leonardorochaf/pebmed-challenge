import { Schedule } from '../../../models/Schedule'

export interface ISaveScheduleRepository {
  createAndSave: (params: SaveScheduleParams) => Promise<Schedule>
}

export type SaveScheduleParams = {
  time: Date
  patientId: string
  doctorId: string
}
