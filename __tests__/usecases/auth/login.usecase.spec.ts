import faker from 'faker'
import { InvalidCredentialsError } from '../../../src/errors/InvalidCredentialsError'
import { Doctor } from '../../../src/models/Doctor'
import { IGetDoctorByEmailRepository } from '../../../src/repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { ISaveSessionRepository, SaveSessionData } from '../../../src/repositories/session/interfaces/save-session.repository.interface'
import { IHasherComparer } from '../../../src/services/cryptography/interfaces/hasher-comparer.interface'
import { IGenerateToken } from '../../../src/services/jwt/interfaces/generate-token.interface'
import { LoginUsecase } from '../../../src/usecases/auth/login.usecase'

const mockRequest = {
  email: faker.internet.email(),
  password: faker.internet.password()
}

const mockGetDoctorByEmailResponse = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.datatype.uuid(),
  createdAt: faker.date.past()
}

const mockGenerateTokenResponse = faker.datatype.uuid()

class GetDoctorByEmailRepositoryStub implements IGetDoctorByEmailRepository {
  async getByEmail (email: string): Promise<Doctor> {
    return mockGetDoctorByEmailResponse
  }
}

class HasherComparerStub implements IHasherComparer {
  async compare (text: string, hashedText: string): Promise<boolean> {
    return true
  }
}

class GenerateTokenStub implements IGenerateToken {
  async generate (text: string): Promise<string> {
    return mockGenerateTokenResponse
  }
}

class SaveSessionRepositoryStub implements ISaveSessionRepository {
  async createAndSave (data: SaveSessionData): Promise<void> { }
}

type SutTypes = {
  sut: LoginUsecase
  getDoctorByEmailRepositoryStub: GetDoctorByEmailRepositoryStub
  hasherComparerStub: HasherComparerStub
  generateTokenStub: GenerateTokenStub
  saveSessionRepositoryStub: SaveSessionRepositoryStub
}

const sutFactory = (): SutTypes => {
  const saveSessionRepositoryStub = new SaveSessionRepositoryStub()
  const generateTokenStub = new GenerateTokenStub()
  const hasherComparerStub = new HasherComparerStub()
  const getDoctorByEmailRepositoryStub = new GetDoctorByEmailRepositoryStub()
  const sut = new LoginUsecase(getDoctorByEmailRepositoryStub, hasherComparerStub, generateTokenStub, saveSessionRepositoryStub)
  return {
    sut,
    getDoctorByEmailRepositoryStub,
    hasherComparerStub,
    generateTokenStub,
    saveSessionRepositoryStub
  }
}

describe('Login Usecase', () => {
  test('Should call GetDoctorByEmailRepository with correct email', async () => {
    const { sut, getDoctorByEmailRepositoryStub } = sutFactory()
    const getByEmailSpy = jest.spyOn(getDoctorByEmailRepositoryStub, 'getByEmail')
    await sut.execute(mockRequest)
    expect(getByEmailSpy).toHaveBeenCalledWith(mockRequest.email)
  })

  test('Should throw InvalidCredentialsError if GetDoctorByEmailRepository returns null', async () => {
    const { sut, getDoctorByEmailRepositoryStub } = sutFactory()
    jest.spyOn(getDoctorByEmailRepositoryStub, 'getByEmail').mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should throw if GetDoctorByEmailRepository throws', async () => {
    const { sut, getDoctorByEmailRepositoryStub } = sutFactory()
    jest.spyOn(getDoctorByEmailRepositoryStub, 'getByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call HasherComparer with correct password and hashedPassword', async () => {
    const { sut, hasherComparerStub } = sutFactory()
    const compareSpy = jest.spyOn(hasherComparerStub, 'compare')
    await sut.execute(mockRequest)
    expect(compareSpy).toHaveBeenCalledWith(mockRequest.password, mockGetDoctorByEmailResponse.password)
  })

  test('Should throw InvalidCredentialsError if HasherComparer returns false', async () => {
    const { sut, hasherComparerStub } = sutFactory()
    jest.spyOn(hasherComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should throw if HasherComparer throws', async () => {
    const { sut, hasherComparerStub } = sutFactory()
    jest.spyOn(hasherComparerStub, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call GenerateToken with correct value', async () => {
    const { sut, generateTokenStub } = sutFactory()
    const generateSpy = jest.spyOn(generateTokenStub, 'generate')
    await sut.execute(mockRequest)
    expect(generateSpy).toHaveBeenCalledWith(mockGetDoctorByEmailResponse.id)
  })

  test('Should throw if GenerateToken throws', async () => {
    const { sut, generateTokenStub } = sutFactory()
    jest.spyOn(generateTokenStub, 'generate').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call SaveSessionRepository with correct values', async () => {
    const { sut, saveSessionRepositoryStub } = sutFactory()
    const generateSpy = jest.spyOn(saveSessionRepositoryStub, 'createAndSave')
    await sut.execute(mockRequest)
    expect(generateSpy).toHaveBeenCalledWith({ token: mockGenerateTokenResponse, doctor: mockGetDoctorByEmailResponse })
  })
})
