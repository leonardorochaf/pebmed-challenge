import faker from 'faker'

import { EmailAlreadyInUseError } from '../../../src/errors/email-already-in-use-error'
import { Doctor } from '../../../src/models/Doctor'
import { IGetDoctorByEmailRepository } from '../../../src/repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { ISaveDoctorRepository, SaveDoctorData } from '../../../src/repositories/doctor/interfaces/save-doctor.repository.interface'
import { IHasher } from '../../../src/services/cryptography/interfaces/hasher.interface'
import { SignUpUsecase } from '../../../src/usecases/auth/sign-up.usecase'

const mockRequest = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

const hashedPassword = faker.datatype.uuid()

const mockResponse = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: hashedPassword,
  createdAt: faker.date.past()
}

class GetDoctorByEmailRepositoryStub implements IGetDoctorByEmailRepository {
  async getByEmail (email: string): Promise<Doctor> {
    return null
  }
}

class HasherStub implements IHasher {
  async hash (text: string): Promise<string> {
    return hashedPassword
  }
}

class SaveDoctorRepositoryStub implements ISaveDoctorRepository {
  async createAndSave (data: SaveDoctorData): Promise<Doctor> {
    return mockResponse
  }
}

type SutTypes = {
  sut: SignUpUsecase
  getDoctorByEmailRepositoryStub: GetDoctorByEmailRepositoryStub
  hasherStub: HasherStub
  saveDoctorRepositoryStub: SaveDoctorRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getDoctorByEmailRepositoryStub = new GetDoctorByEmailRepositoryStub()
  const hasherStub = new HasherStub()
  const saveDoctorRepositoryStub = new SaveDoctorRepositoryStub()
  const sut = new SignUpUsecase(getDoctorByEmailRepositoryStub, hasherStub, saveDoctorRepositoryStub)
  return {
    sut,
    getDoctorByEmailRepositoryStub,
    hasherStub,
    saveDoctorRepositoryStub
  }
}

describe('sign Up Usecase', () => {
  test('Should call GetDoctorByEmailRepository with correct email', async () => {
    const { sut, getDoctorByEmailRepositoryStub } = sutFactory()
    const getByEmailSpy = jest.spyOn(getDoctorByEmailRepositoryStub, 'getByEmail')
    await sut.execute(mockRequest)
    expect(getByEmailSpy).toHaveBeenCalledWith(mockRequest.email)
  })

  test('Should throw EmailAlreadyInUseError if GetDoctorByEmailRepository returns a doctor', async () => {
    const { sut, getDoctorByEmailRepositoryStub } = sutFactory()
    jest.spyOn(getDoctorByEmailRepositoryStub, 'getByEmail').mockReturnValueOnce(Promise.resolve(mockResponse))
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow(EmailAlreadyInUseError)
  })

  test('Should throw if GetDoctorByEmailRepository throws', async () => {
    const { sut, getDoctorByEmailRepositoryStub } = sutFactory()
    jest.spyOn(getDoctorByEmailRepositoryStub, 'getByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = sutFactory()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.execute(mockRequest)
    expect(hashSpy).toHaveBeenCalledWith(mockRequest.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = sutFactory()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    expect(promise).rejects.toThrow()
  })

  test('Should call SaveDoctorRepository with correct values', async () => {
    const { sut, saveDoctorRepositoryStub } = sutFactory()
    const createAndSaveSpy = jest.spyOn(saveDoctorRepositoryStub, 'createAndSave')
    await sut.execute(mockRequest)
    expect(createAndSaveSpy).toHaveBeenCalledWith({ name: mockRequest.name, email: mockRequest.email, hashedPassword })
  })

  test('Should throw if SaveDoctorRepository throws', async () => {
    const { sut, saveDoctorRepositoryStub } = sutFactory()
    jest.spyOn(saveDoctorRepositoryStub, 'createAndSave').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })
})
