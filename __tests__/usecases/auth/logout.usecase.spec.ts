import faker from 'faker'

import { Session } from '../../../src/models/Session'
import { IGetActiveSessionByTokenRepository } from '../../../src/repositories/session/interfaces/get-active-session-by-token.respository.interface'
import { LogoutUsecase } from '../../../src/usecases/auth/logout.usecase'

const token = faker.datatype.uuid()

const mockGetActiveSessionByTokenRepositoryResponse = {
  id: faker.datatype.uuid(),
  token: faker.datatype.uuid(),
  loginAt: faker.date.past(),
  logoutAt: null,
  doctor: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.past()
  }
}

type SutTypes = {
  sut: LogoutUsecase
  getActiveSessionByTokenRepositoryStub: GetActiveSessionByTokenRepositoryStub
}

class GetActiveSessionByTokenRepositoryStub implements IGetActiveSessionByTokenRepository {
  async getActiveByToken (token: string): Promise<Session> {
    return mockGetActiveSessionByTokenRepositoryResponse
  }
}

const sutFactory = (): SutTypes => {
  const getActiveSessionByTokenRepositoryStub = new GetActiveSessionByTokenRepositoryStub()
  const sut = new LogoutUsecase(getActiveSessionByTokenRepositoryStub)
  return {
    sut,
    getActiveSessionByTokenRepositoryStub
  }
}

describe('Logout Usecase', () => {
  test('Should call GetActiveSessionByTokenRepository with correct token', async () => {
    const { sut, getActiveSessionByTokenRepositoryStub } = sutFactory()
    const getActiveSpy = jest.spyOn(getActiveSessionByTokenRepositoryStub, 'getActiveByToken')
    await sut.execute(token)
    expect(getActiveSpy).toHaveBeenCalledWith(token)
  })

  test('Should return undefined if GetActiveSessionByTokenRepository retruns null', async () => {
    const { sut, getActiveSessionByTokenRepositoryStub } = sutFactory()
    jest.spyOn(getActiveSessionByTokenRepositoryStub, 'getActiveByToken').mockReturnValueOnce(Promise.resolve(null))
    const empty = await sut.execute(token)
    expect(empty).toBe(undefined)
  })
})
