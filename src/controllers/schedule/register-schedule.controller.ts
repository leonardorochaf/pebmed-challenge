/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IRegisterScheduleUsecase } from '../../usecases/schedule/interfaces/register-schedule.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'
import { IValidator } from '../../validation/interfaces/validator.interface'
import { RegisterScheduleValidatonModel } from '../../validation/validation-models/schedule/register-schedule-validation.model'

export class RegisterScheduleController {
  constructor (
    private readonly validator: IValidator,
    private readonly registerScheduleUsecase: IRegisterScheduleUsecase
  ) { }

  async handle (req: Request, res: Response) {
    try {
      const validationErrors = await this.validator.validate(req.body, RegisterScheduleValidatonModel, false)
      if (validationErrors) {
        return res.status(400).json({ error: validationErrors.errors })
      }

      const { time, patientId } = req.body
      const token = String(req.headers['x-auth-token'])
      await this.registerScheduleUsecase.execute({ time, token, patientId })
    } catch (e) {
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
