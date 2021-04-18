import { DefaultScheduleResponse } from '../../dtos/schedule/default-schedule-response'
import { ScheduleTimeAlreadyTakenError } from '../../errors/schedule-time-already-taken-error'
import { IGetPatientByIdRepository } from '../../repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IGetScheduleByTimeRepository } from '../../repositories/schedule/interfaces/get-schedule-by-time.reposioty.interface'
import { IRegisterScheduleUsecase, RegisterScheduleParams } from './interfaces/register-schedule.usecase.interface'

export class RegisterScheduleUsecase implements IRegisterScheduleUsecase {
  constructor (
    private readonly getScheduleByTimeRepository: IGetScheduleByTimeRepository,
    private readonly getPatientByIdRepository: IGetPatientByIdRepository
  ) { }

  async execute (params: RegisterScheduleParams): Promise<DefaultScheduleResponse> {
    const scheduleByTime = await this.getScheduleByTimeRepository.getByTime(params.time)
    if (scheduleByTime) {
      throw new ScheduleTimeAlreadyTakenError()
    }

    await this.getPatientByIdRepository.getById(params.patientId)

    return Promise.resolve(null)
  }
}
