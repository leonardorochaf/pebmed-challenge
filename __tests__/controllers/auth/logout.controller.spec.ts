/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'
import { LogoutController } from '../../../src/controllers/auth/logout.controller'

import { ILogoutUsecase } from '../../../src/usecases/auth/interfaces/logout.usecase.interface'
import { serverErrorMessage } from '../../../src/utils/strings'

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

  test('Should 500 if LogoutUsecase throws', async () => {
    const { sut, logoutUsecaseStub } = sutFactory()
    jest.spyOn(logoutUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: serverErrorMessage })
  })

  test('Should 204 if LogoutUsecase returns undefined', async () => {
    const { sut, logoutUsecaseStub } = sutFactory()
    jest.spyOn(logoutUsecaseStub, 'execute').mockReturnValueOnce(Promise.resolve(undefined))
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.json).toHaveBeenCalledWith()
  })
})
