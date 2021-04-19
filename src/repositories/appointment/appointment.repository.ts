/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Appointment } from '../../models/Appointment'
import { ISaveAppointmentRepository, SaveAppointmentParams } from './interfaces/save-appointment.repository.interface'

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> implements ISaveAppointmentRepository {
  async createAndSave (params: SaveAppointmentParams): Promise<void> {
    const createdAppointment = new Appointment()
    createdAppointment.id = uuid()
    createdAppointment.observation = params.observation
    createdAppointment.schedule = <any>params.scheduleId
    await this.save(createdAppointment, { reload: false })
  }
}
