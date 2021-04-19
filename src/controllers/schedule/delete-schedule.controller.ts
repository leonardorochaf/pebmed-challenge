/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

import { ScheduleNotFoundError } from '../../errors/schedule-not-found-error'
import { IDeleteScheduleUsecase } from '../../usecases/schedule/interfaces/delete-schedule.usecase.interface'
import { serverErrorMessage } from '../../utils/strings'

export class DeleteScheduleController {
  constructor (private readonly deleteScheduleUsecase: IDeleteScheduleUsecase) { }

  async handle (req: Request, res: Response) {
    try {
      await this.deleteScheduleUsecase.execute(req.params.id)

      return res.status(204).json()
    } catch (e) {
      if (e instanceof ScheduleNotFoundError) {
        return res.status(404).json({ error: e.message })
      }
      return res.status(500).json({ error: serverErrorMessage })
    }
  }
}
