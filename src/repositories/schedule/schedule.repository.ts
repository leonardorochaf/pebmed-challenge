/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Schedule } from '../../models/Schedule'
import { ISaveScheduleRepository, SaveScheduleParams } from './interfaces/save-schedule.repository.interface'

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> implements ISaveScheduleRepository {
  async createAndSave (params: SaveScheduleParams): Promise<Schedule> {
    const createdSchedule = new Schedule()
    createdSchedule.time = params.time
    createdSchedule.patient = <any>params.patientId
    createdSchedule.doctor = <any>params.doctorId
    createdSchedule.id = uuid()
    await this.save(createdSchedule)
    return await this.findOne({ id: createdSchedule.id })
  }
}
