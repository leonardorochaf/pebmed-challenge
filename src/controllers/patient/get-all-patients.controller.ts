/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { serverErrorMessage } from '../../utils/strings'
import { IGetAllPatientsUsecase } from '../../../src/usecases/patient/interface/get-all-patients.usecase.interface'

export class GetAllPatientsController {
  constructor (private readonly getAllPatientsUsecase: IGetAllPatientsUsecase) { }

  async handle (req: Request, res: Response) {
    try {
      const allPatients = await this.getAllPatientsUsecase.execute()

      return res.status(200).json(allPatients)
    } catch (e) {
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
