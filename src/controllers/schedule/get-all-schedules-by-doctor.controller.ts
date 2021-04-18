/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IGetAllSchedulesByDoctorUsecase } from '../../usecases/schedule/interfaces/get-all-schedules-by-doctor.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'

export class GetAllSchedulesByDoctorController {
  constructor (private readonly getAllSchedulesByDoctorUsecase: IGetAllSchedulesByDoctorUsecase) { }

  async handle (req: Request, res: Response) {
    try {
      const token = String(req.headers['x-auth-token'])
      await this.getAllSchedulesByDoctorUsecase.execute(token)
    } catch (e) {
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
