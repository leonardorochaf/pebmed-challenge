/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { ICreateAppointmentUsecase } from '../../usecases/appointment/interfaces/create-appointment.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'
import { IValidator } from '../../validation/interfaces/validator.interface'
import { CreateAppointmentValidationModel } from '../../validation/validation-models/appointment/create-appointment-validation.model'

export class CreateAppointmentController {
  constructor (
    private readonly validator: IValidator,
    private readonly createAppointmentUsecase: ICreateAppointmentUsecase
  ) { }

  async handle (req: Request, res: Response) {
    try {
      const validationErrors = await this.validator.validate(req.body, CreateAppointmentValidationModel, false)
      if (validationErrors) {
        return res.status(400).json({ error: validationErrors.errors })
      }

      const { observation, scheduleId } = req.body
      await this.createAppointmentUsecase.execute({ observation, scheduleId })

      return res.status(201).json()
    } catch (e) {
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
