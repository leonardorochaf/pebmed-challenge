/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IGetAllAppointmentsByPatientUsecase } from '../../usecases/appointment/interfaces/get-all-appointments-by-patient.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'

export class GetAllAppointmentsByPatientController {
  constructor (private readonly getAllAppointmentsByPatientUsecase: IGetAllAppointmentsByPatientUsecase) { }

  async handle (req: Request, res: Response) {
    try {
      const allAppointmentsByPatient = await this.getAllAppointmentsByPatientUsecase.execute(req.params.patientId)

      return res.status(200).json(allAppointmentsByPatient)
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: serverErrorMessage })
    }
  }
}
