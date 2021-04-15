/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'
import { EmailAlreadyInUseError } from '../../errors/email-already-in-use-error'
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

      const createdPatient = await this.createPatientUsecase.execute({ name, phone, email, birthday, gender, height, weight })

      return res.status(201).json(createdPatient)
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError) {
        return res.status(400).json({ error: e.message })
      }

      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
