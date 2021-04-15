/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'
import { LogoutController } from '../../../src/controllers/auth/logout.controller'

import { ILogoutUsecase } from '../../../src/usecases/auth/interfaces/logout.usecase.interface'

const req: Request = {
  headers: {
    'x-auth-token': faker.datatype.uuid()
  }
} as unknown as Request

class LogoutUsecaseStub implements ILogoutUsecase {
  async execute (token: string): Promise<void> { }
}

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

type SutTypes = {
  sut: LogoutController
  logoutUsecaseStub: LogoutUsecaseStub
}

const sutFactory = (): SutTypes => {
  const logoutUsecaseStub = new LogoutUsecaseStub()
  const sut = new LogoutController(logoutUsecaseStub)
  return {
    sut,
    logoutUsecaseStub
  }
}

describe('Logout Controller', () => {
  test('Should call LogoutUsecase with correct token', async () => {
    const { sut, logoutUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(logoutUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(req.headers['x-auth-token'])
  })
})
