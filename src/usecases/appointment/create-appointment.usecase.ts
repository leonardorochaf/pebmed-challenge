import { ISaveAppointmentRepository } from '../../repositories/appointment/interfaces/save-appointment.repository.interface'
import { ICreateAppointmentUsecase, CreateAppointmentParams } from './interfaces/create-appointment.usecase.interface'

export class CreateAppointmentUsecase implements ICreateAppointmentUsecase {
  constructor (private readonly saveAppointmentRepository: ISaveAppointmentRepository) { }

  async execute (params: CreateAppointmentParams): Promise<void> {
    await this.saveAppointmentRepository.createAndSave(params)
  }
}
