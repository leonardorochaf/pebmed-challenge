/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IDeletePatientUsecase } from '../../usecases/patient/interface/delete-patient.usecase.interface'

export class DeletePatientController {
  constructor (private readonly deletePatientUsecase: IDeletePatientUsecase) { }

  async handle (req: Request, res: Response) {
    await this.deletePatientUsecase.execute(req.params.id)
  }
}
