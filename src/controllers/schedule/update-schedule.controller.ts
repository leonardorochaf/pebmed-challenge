/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IValidator } from '../../validation/interfaces/validator.interface'
import { UpdateScheduleValidatonModel } from '../../validation/validation-models/schedule/update-schedule-validation.model'

export class UpdateScheduleController {
  constructor (
    private readonly validator: IValidator
  ) { }

  async handle (req: Request, res: Response) {
    await this.validator.validate(req.body, UpdateScheduleValidatonModel, true)
  }
}
