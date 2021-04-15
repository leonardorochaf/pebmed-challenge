/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IValidator } from '../../validation/interfaces/validator.interface'
import { CreatePatientValidationModel } from '../../validation/validation-models/patient/create-patient-validation.model'

export class CreatePatientController {
  constructor (
    private readonly validator: IValidator
  ) { }

  async handle (req: Request, res: Response) {
    await this.validator.validate(req.body, CreatePatientValidationModel, false)
  }
}
