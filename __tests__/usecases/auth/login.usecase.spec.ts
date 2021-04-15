import faker from 'faker'
import { InvalidCredentialsError } from '../../../src/errors/InvalidCredentialsError'
import { Doctor } from '../../../src/models/Doctor'
import { IGetDoctorByEmailRepository } from '../../../src/repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { IHasherComparer } from '../../../src/services/cryptography/interfaces/hasher-comparer.interface'
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

type SutTypes = {
  sut: LoginUsecase
  getDoctorByEmailRepositoryStub: GetDoctorByEmailRepositoryStub
  hasherComparerStub: HasherComparerStub
}

const sutFactory = (): SutTypes => {
  const hasherComparerStub = new HasherComparerStub()
  const getDoctorByEmailRepositoryStub = new GetDoctorByEmailRepositoryStub()
  const sut = new LoginUsecase(getDoctorByEmailRepositoryStub, hasherComparerStub)
  return {
    sut,
    getDoctorByEmailRepositoryStub,
    hasherComparerStub
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
})
