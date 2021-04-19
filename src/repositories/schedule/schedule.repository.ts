/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Schedule } from '../../models/Schedule'
import { ISaveScheduleRepository, SaveScheduleParams } from './interfaces/save-schedule.repository.interface'
import { IGetScheduleByTimeRepository } from './interfaces/get-schedule-by-time.reposioty.interface'
import { IGetAllSchedulesByDoctorRepository } from './interfaces/get-all-schedules-by-doctor.repository.interface'
import { IGetScheduleByIdRepository } from './interfaces/get-schedule-by-id.repository'
import { IUpdateScheduleRepository, UpdateScheduleData } from './interfaces/update-schedule.repository.interface'
import { IDeleteScheduleRepository } from './interfaces/delete-schedule.repository'

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> implements
  ISaveScheduleRepository,
  IGetScheduleByTimeRepository,
  IGetAllSchedulesByDoctorRepository,
  IGetScheduleByIdRepository,
  IUpdateScheduleRepository,
  IDeleteScheduleRepository {
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

  async getById (scheduleId: string): Promise<Schedule> {
    return await this.findOne({ id: scheduleId })
  }

  async updateAndReload (scheduleId: string, data: UpdateScheduleData): Promise<Schedule> {
    const updatedSchedule = this.create(data)
    updatedSchedule.id = scheduleId
    await this.save(updatedSchedule)
    return await this.findOne({ id: scheduleId })
  }

  async deleteById (scheduleId: string): Promise<void> {
    await this.delete({ id: scheduleId })
  }
}
