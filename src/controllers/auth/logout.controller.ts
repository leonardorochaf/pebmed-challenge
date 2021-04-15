/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { ILogoutUsecase } from '../../usecases/auth/interfaces/logout.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'

export class LogoutController {
  constructor (private readonly logoutUsecase: ILogoutUsecase) { }

  async handle (req: Request, res: Response) {
    try {
      const token = String(req.headers['x-auth-token'])
      await this.logoutUsecase.execute(token)

      return res.status(204).json()
    } catch (e) {
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
