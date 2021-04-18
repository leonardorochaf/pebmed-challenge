/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IValidator } from '../../validation/interfaces/validator.interface'
import { RegisterScheduleValidatonModel } from '../../validation/validation-models/schedule/register-schedule-validation.model'

export class RegisterScheduleController {
  constructor (
    private readonly validator: IValidator
  ) { }

  async handle (req: Request, res: Response) {
    await this.validator.validate(req.body, RegisterScheduleValidatonModel, false)
  }
}
