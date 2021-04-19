/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { IDeleteScheduleUsecase } from '../../usecases/schedule/interfaces/delete-schedule.usecase.interface'

export class DeleteScheduleController {
  constructor (private readonly deleteScheduleUsecase: IDeleteScheduleUsecase) { }

  async handle (req: Request, res: Response) {
    await this.deleteScheduleUsecase.execute(req.params.id)
  }
}
