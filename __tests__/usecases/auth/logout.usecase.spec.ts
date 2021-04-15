import faker from 'faker'

import { Session } from '../../../src/models/Session'
import { IDeleteSessionRepository } from '../../../src/repositories/session/interfaces/delete-session.repository.interface'
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

class GetActiveSessionByTokenRepositoryStub implements IGetActiveSessionByTokenRepository {
  async getActiveByToken (token: string): Promise<Session> {
    return mockGetActiveSessionByTokenRepositoryResponse
  }
}

class DeleteSessionRepositoryStub implements IDeleteSessionRepository {
  async logicalDelete (sessionId: string): Promise<void> { }
}

type SutTypes = {
  sut: LogoutUsecase
  getActiveSessionByTokenRepositoryStub: GetActiveSessionByTokenRepositoryStub
  deleteSessionRepositoryStub: DeleteSessionRepositoryStub
}

const sutFactory = (): SutTypes => {
  const deleteSessionRepositoryStub = new DeleteSessionRepositoryStub()
  const getActiveSessionByTokenRepositoryStub = new GetActiveSessionByTokenRepositoryStub()
  const sut = new LogoutUsecase(getActiveSessionByTokenRepositoryStub, deleteSessionRepositoryStub)
  return {
    sut,
    getActiveSessionByTokenRepositoryStub,
    deleteSessionRepositoryStub
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

  test('Should throw if GetActiveSessionByTokenRepository throws', async () => {
    const { sut, getActiveSessionByTokenRepositoryStub } = sutFactory()
    jest.spyOn(getActiveSessionByTokenRepositoryStub, 'getActiveByToken').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(token)
    await expect(promise).rejects.toThrow()
  })

  test('Should call DeleteSessionRepository with correct id', async () => {
    const { sut, deleteSessionRepositoryStub } = sutFactory()
    const logicalDeleteSpy = jest.spyOn(deleteSessionRepositoryStub, 'logicalDelete')
    await sut.execute(token)
    expect(logicalDeleteSpy).toHaveBeenCalledWith(mockGetActiveSessionByTokenRepositoryResponse.id)
  })

  test('Should throw if DeleteSessionRepository throws', async () => {
    const { sut, deleteSessionRepositoryStub } = sutFactory()
    jest.spyOn(deleteSessionRepositoryStub, 'logicalDelete').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(token)
    await expect(promise).rejects.toThrow()
  })
})
