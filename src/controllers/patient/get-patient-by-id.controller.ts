/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { PatientNotFoundError } from '../../errors/patient-not-found-error'
import { IGetPatientByIdUsecase } from '../../usecases/patient/interface/get-patient-by-id.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'

export class GetPatientByIdController {
  constructor (private readonly getPatientByIdUsecase: IGetPatientByIdUsecase) { }

  async handle (req: Request, res: Response) {
    try {
      const patientById = await this.getPatientByIdUsecase.execute(req.params.id)
      return res.status(200).json(patientById)
    } catch (e) {
      if (e instanceof PatientNotFoundError) {
        return res.status(404).json({ error: e.message })
      }
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
