import { DefaultScheduleResponse } from '../../dtos/schedule/default-schedule-response'
import { PatientNotFoundError } from '../../errors/patient-not-found-error'
import { ScheduleTimeAlreadyTakenError } from '../../errors/schedule-time-already-taken-error'
import { IGetPatientByIdRepository } from '../../repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IGetScheduleByTimeRepository } from '../../repositories/schedule/interfaces/get-schedule-by-time.reposioty.interface'
import { ISaveScheduleRepository } from '../../repositories/schedule/interfaces/save-schedule.repository.interface'
import { IDecodeToken } from '../../services/jwt/interfaces/decode-token.interface'
import { IRegisterScheduleUsecase, RegisterScheduleParams } from './interfaces/register-schedule.usecase.interface'

export class RegisterScheduleUsecase implements IRegisterScheduleUsecase {
  constructor (
    private readonly getScheduleByTimeRepository: IGetScheduleByTimeRepository,
    private readonly getPatientByIdRepository: IGetPatientByIdRepository,
    private readonly decodeToken: IDecodeToken,
    private readonly saveSchedule: ISaveScheduleRepository
  ) { }

  async execute (params: RegisterScheduleParams): Promise<DefaultScheduleResponse> {
    const scheduleByTime = await this.getScheduleByTimeRepository.getByTime(params.time)
    if (scheduleByTime) {
      throw new ScheduleTimeAlreadyTakenError()
    }

    const patientById = await this.getPatientByIdRepository.getById(params.patientId)
    if (!patientById) {
      throw new PatientNotFoundError()
    }

    const doctorId = await this.decodeToken.decode(params.token)

    await this.saveSchedule.createAndSave({ time: params.time, patientId: params.patientId, doctorId: doctorId })

    return Promise.resolve(null)
  }
}
