/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Appointment } from '../../models/Appointment'
import { ISaveAppointmentRepository, SaveAppointmentParams } from './interfaces/save-appointment.repository.interface'
import { IGetAllAppointmentsByPatientRepository } from './interfaces/get-all-appointments-by-patient.repository.interface'

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> implements ISaveAppointmentRepository, IGetAllAppointmentsByPatientRepository {
  async createAndSave (params: SaveAppointmentParams): Promise<void> {
    const createdAppointment = new Appointment()
    createdAppointment.id = uuid()
    createdAppointment.observation = params.observation
    createdAppointment.schedule = <any>params.scheduleId
    await this.save(createdAppointment, { reload: false })
  }

  async getAllByPatient (patientId: string): Promise<Appointment[]> {
    return await this.createQueryBuilder('appointment')
      .innerJoinAndSelect('appointment.schedule', 'schedule')
      .innerJoin('schedule.patient', 'patient')
      .where('patient.id = :patientId', { patientId: patientId })
      .getMany()
  }
}
