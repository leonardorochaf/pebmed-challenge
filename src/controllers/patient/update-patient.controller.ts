/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IValidator } from '../../validation/interfaces/validator.interface'
import { UpdatePatientValidationModel } from '../../validation/validation-models/patient/update-patient-validation.model'

export class UpdatePatientController {
  constructor (
    private readonly validator: IValidator
  ) { }

  async handle (req: Request, res: Response) {
    await this.validator.validate(req.body, UpdatePatientValidationModel, true)
  }
}
