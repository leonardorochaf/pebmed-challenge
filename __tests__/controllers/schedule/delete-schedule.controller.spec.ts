/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'
import { DeleteScheduleController } from '../../../src/controllers/schedule/delete-schedule.controller'
import { IDeleteScheduleUsecase } from '../../../src/usecases/schedule/interfaces/delete-schedule.usecase.interface'

const req: Request = {
  params: {
    id: faker.datatype.uuid()
  }
} as unknown as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

class DeleteScheduleUsecaseStub implements IDeleteScheduleUsecase {
  async execute (scheduleId: string): Promise<void> { }
}

type SutTypes = {
  sut: DeleteScheduleController
  deleteScheduleUsecaseStub: DeleteScheduleUsecaseStub
}

const sutFactory = (): SutTypes => {
  const deleteScheduleUsecaseStub = new DeleteScheduleUsecaseStub()
  const sut = new DeleteScheduleController(deleteScheduleUsecaseStub)
  return {
    sut,
    deleteScheduleUsecaseStub
  }
}

describe('Delete Schedule Controller', () => {
  test('Should call DeletePatientUsecase with correct id', async () => {
    const { sut, deleteScheduleUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(deleteScheduleUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(req.params.id)
  })
})
