/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IGetAllAppointmentsByPatientUsecase } from '../../usecases/appointment/interfaces/get-all-appointments-by-patient.usecase.interface'

export class GetAllAppointmentsByPatientController {
  constructor (private readonly getAllAppointmentsByPatientUsecase: IGetAllAppointmentsByPatientUsecase) { }

  async handle (req: Request, res: Response) {
    await this.getAllAppointmentsByPatientUsecase.execute(req.params.patientId)
  }
}
