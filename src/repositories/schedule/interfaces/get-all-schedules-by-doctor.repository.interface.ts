import { Schedule } from '../../../models/Schedule'

export interface IGetAllSchedulesByDoctorRepository {
  getAllByDoctor: (doctorId: string) => Promise<Schedule[]>
}
