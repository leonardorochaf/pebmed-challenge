/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { ScheduleNotFoundError } from '../../errors/schedule-not-found-error'
import { IUpdateScheduleUsecase } from '../../usecases/schedule/interfaces/update-schedule.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'
import { IValidator } from '../../validation/interfaces/validator.interface'
import { UpdateScheduleValidatonModel } from '../../validation/validation-models/schedule/update-schedule-validation.model'

export class UpdateScheduleController {
  constructor (
    private readonly validator: IValidator,
    private readonly updateScheduleUsecase: IUpdateScheduleUsecase
  ) { }

  async handle (req: Request, res: Response) {
    try {
      const validationErrors = await this.validator.validate(req.body, UpdateScheduleValidatonModel, true)
      if (validationErrors) {
        return res.status(400).json({ error: validationErrors.errors })
      }

      const { time } = req.body
      await this.updateScheduleUsecase.execute(req.params.id, { time })
    } catch (e) {
      if (e instanceof ScheduleNotFoundError) {
        return res.status(404).json({ error: e.message })
      }
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
