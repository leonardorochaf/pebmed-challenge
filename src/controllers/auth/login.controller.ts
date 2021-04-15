/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { ILoginUsecase } from '../../usecases/auth/interfaces/login.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'
import { IValidator } from '../../validation/interfaces/validator.interface'
import { LoginValidationModel } from '../../validation/validation-models/auth/login-validation.model'

export class LoginController {
  constructor (
    private readonly validator: IValidator,
    private readonly loginUsecase: ILoginUsecase
  ) { }

  async handle (req: Request, res: Response) {
    try {
      const validationErrors = await this.validator.validate(req.body, LoginValidationModel, false)
      if (validationErrors) {
        return res.status(400).json({ error: validationErrors.errors })
      }

      const { email, password } = req.body
      const token = await this.loginUsecase.execute({ email, password })

      return res.status(200).json(token)
    } catch (e) {
      if (e instanceof InvalidCredentialsError) {
        return res.status(400).json({ error: e.message })
      }

      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
