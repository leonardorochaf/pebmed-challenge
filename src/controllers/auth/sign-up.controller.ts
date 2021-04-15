/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IValidator } from '../../validation/interfaces/validator.interface'
import { SignUpValidationModel } from '../../validation/validation-models/auth/sign-up.validation.model'

export class SignUpController {
  constructor (
    private readonly validator: IValidator
  ) { }

  async handle (req: Request, res: Response) {
    const validationErrors = await this.validator.validate(req.body, SignUpValidationModel, false)
    if (validationErrors) {
      return res.status(400).json({ error: validationErrors.errors })
    }
  }
}
