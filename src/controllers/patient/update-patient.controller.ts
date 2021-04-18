/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IUpdatePatientUsecase } from '../../usecases/patient/interface/update-patient.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'
import { IValidator } from '../../validation/interfaces/validator.interface'
import { UpdatePatientValidationModel } from '../../validation/validation-models/patient/update-patient-validation.model'

export class UpdatePatientController {
  constructor (
    private readonly validator: IValidator,
    private readonly updatePatientUsecase: IUpdatePatientUsecase
  ) { }

  async handle (req: Request, res: Response) {
    try {
      const validationErrors = await this.validator.validate(req.body, UpdatePatientValidationModel, true)
      if (validationErrors) {
        return res.status(400).json({ error: validationErrors.errors })
      }

      const { name, phone, email, birthday, gender, height, weight } = req.body
      await this.updatePatientUsecase.execute(req.params.id, { name, phone, email, birthday, gender, height, weight })
    } catch (e) {
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
