/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IValidator } from '../../validation/interfaces/validator.interface'
import { CreateAppointmentValidationModel } from '../../validation/validation-models/appointment/create-appointment-validation.model'

export class CreateAppointmentController {
  constructor (
    private readonly validator: IValidator
  ) { }

  async handle (req: Request, res: Response) {
    await this.validator.validate(req.body, CreateAppointmentValidationModel, false)
  }
}
