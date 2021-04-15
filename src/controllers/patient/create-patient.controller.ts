/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'
import { ICreatePatientUsecase } from '../../usecases/patient/interface/create-patient.usecase.interface'

import { serverErrorMessage } from '../../utils/strings'
import { IValidator } from '../../validation/interfaces/validator.interface'
import { CreatePatientValidationModel } from '../../validation/validation-models/patient/create-patient-validation.model'

export class CreatePatientController {
  constructor (
    private readonly validator: IValidator,
    private readonly createPatientUsecase: ICreatePatientUsecase
  ) { }

  async handle (req: Request, res: Response) {
    try {
      const validationErrors = await this.validator.validate(req.body, CreatePatientValidationModel, false)
      if (validationErrors) {
        return res.status(400).json({ error: validationErrors.errors })
      }

      const { name, phone, email, birthday, gender, height, weight } = req.body

      await this.createPatientUsecase.execute({ name, phone, email, birthday, gender, height, weight })
    } catch (e) {
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
