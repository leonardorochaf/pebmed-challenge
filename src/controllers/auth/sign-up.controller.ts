/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'
import { EmailAlreadyInUseError } from '../../errors/email-already-in-use-error'
import { ISignUpUsecase } from '../../usecases/auth/interfaces/sign-up.usecase.interface'

import { serverErrorMessage } from '../../utils/strings'
import { IValidator } from '../../validation/interfaces/validator.interface'
import { SignUpValidationModel } from '../../validation/validation-models/auth/sign-up.validation.model'

export class SignUpController {
  constructor (
    private readonly validator: IValidator,
    private readonly signUpUsecase: ISignUpUsecase
  ) { }

  async handle (req: Request, res: Response) {
    try {
      const validationErrors = await this.validator.validate(req.body, SignUpValidationModel, false)
      if (validationErrors) {
        return res.status(400).json({ error: validationErrors.errors })
      }

      const { name, email, password } = req.body
      await this.signUpUsecase.execute({ name, email, password })

      return res.status(201).json()
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError) {
        return res.status(400).json({ error: e.message })
      }

      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
