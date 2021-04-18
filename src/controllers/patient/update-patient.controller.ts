/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { EmailAlreadyInUseError } from '../../errors/email-already-in-use-error'
import { PatientNotFoundError } from '../../errors/patient-not-found-error'
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
      const updatedPatient = await this.updatePatientUsecase.execute(req.params.id, { name, phone, email, birthday, gender, height, weight })

      return res.status(200).json(updatedPatient)
    } catch (e) {
      if (e instanceof PatientNotFoundError) {
        return res.status(404).json({ error: e.message })
      }
      if (e instanceof EmailAlreadyInUseError) {
        return res.status(400).json({ error: e.message })
      }
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
