/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Schedule } from '../../models/Schedule'
import { ISaveScheduleRepository, SaveScheduleParams } from './interfaces/save-schedule.repository.interface'
import { IGetScheduleByTimeRepository } from './interfaces/get-schedule-by-time.reposioty.interface'
import { IGetAllSchedulesByDoctorRepository } from './interfaces/get-all-schedules-by-doctor.repository.interface'

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> implements
  ISaveScheduleRepository,
  IGetScheduleByTimeRepository,
  IGetAllSchedulesByDoctorRepository {
  async createAndSave (params: SaveScheduleParams): Promise<Schedule> {
    const createdSchedule = new Schedule()
    createdSchedule.time = params.time
    createdSchedule.patient = <any>params.patientId
    createdSchedule.doctor = <any>params.doctorId
    createdSchedule.id = uuid()
    await this.save(createdSchedule)
    return await this.findOne({ id: createdSchedule.id })
  }

  async getByTime (time: Date): Promise<Schedule> {
    return await this.findOne({ time })
  }

  async getAllByDoctor (doctorId: string): Promise<Schedule[]> {
    return await this.createQueryBuilder('schedule')
      .innerJoinAndSelect('schedule.patient', 'patient')
      .innerJoin('schedule.doctor', 'doctor')
      .where('doctor.id = :id', { id: doctorId })
      .getMany()
  }
}
