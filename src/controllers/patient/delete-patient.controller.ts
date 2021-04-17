/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { PatientNotFoundError } from '../../errors/patient-not-found-error'
import { IDeletePatientUsecase } from '../../usecases/patient/interface/delete-patient.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'

export class DeletePatientController {
  constructor (private readonly deletePatientUsecase: IDeletePatientUsecase) { }

  async handle (req: Request, res: Response) {
    try {
      await this.deletePatientUsecase.execute(req.params.id)
    } catch (e) {
      if (e instanceof PatientNotFoundError) {
        return res.status(404).json({ error: e.message })
      }
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
