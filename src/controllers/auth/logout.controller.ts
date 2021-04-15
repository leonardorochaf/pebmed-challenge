/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { ILogoutUsecase } from '../../usecases/auth/interfaces/logout.usecase.interface'

export class LogoutController {
  constructor (private readonly logoutUsecase: ILogoutUsecase) { }

  async handle (req: Request, res: Response) {
    const token = String(req.headers['x-auth-token'])
    await this.logoutUsecase.execute(token)
  }
}
