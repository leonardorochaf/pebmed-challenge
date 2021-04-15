/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IGetAllPatientsUsecase } from '../../../src/usecases/patient/interface/get-all-patients.usecase.interface'
import { serverErrorMessage } from '../../../src/utils/strings'

export class GetAllPatientsController {
  constructor (private readonly getAllPatientsUsecase: IGetAllPatientsUsecase) { }

  async handle (req: Request, res: Response) {
    try {
      await this.getAllPatientsUsecase.execute()
    } catch (e) {
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
