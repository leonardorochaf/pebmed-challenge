/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IGetPatientByIdUsecase } from '../../usecases/patient/interface/get-patient-by-id.usecase.interface'

export class GetPatientByIdController {
  constructor (private readonly getPatientByIdUsecase: IGetPatientByIdUsecase) { }

  async handle (req: Request, res: Response) {
    await this.getPatientByIdUsecase.execute(req.params.id)
  }
}
