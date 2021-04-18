import faker from 'faker'

import { EmailAlreadyInUseError } from '../../../src/errors/email-already-in-use-error'
import { PatientNotFoundError } from '../../../src/errors/patient-not-found-error'
import { Patient } from '../../../src/models/Patient'
import { IGetPatientByEmailRepository } from '../../../src/repositories/patient/interfaces/get-patient-by-email.repository.interface'
import { IGetPatientByIdRepository } from '../../../src/repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IUpdatePatientRepository, UpdatePatientRepositoryParams } from '../../../src/repositories/patient/interfaces/update-patient.repository.interface'
import { UpdatePatientUsecase } from '../../../src/usecases/patient/update-patient.usecase'
import { Gender } from '../../../src/utils/gender-enum'

const mockRequestId = faker.datatype.uuid()

const mockRequest = {
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  birthday: faker.date.past(),
  gender: Gender.MASCULINO,
  height: faker.datatype.float({ min: 0, max: 2.5 }),
  weight: faker.datatype.float({ min: 0, max: 100 })
}

const mockResponse = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  birthday: faker.date.past(),
  gender: Gender.MASCULINO,
  height: faker.datatype.float({ min: 0, max: 2.5 }),
  weight: faker.datatype.float({ min: 0, max: 100 }),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
  deletedAt: null
}

class GetPatientByIdRepositoryStub implements IGetPatientByIdRepository {
  async getById (patientId: string): Promise<Patient> {
    return mockResponse
  }
}

class GetPatientByEmailRepositoryStub implements IGetPatientByEmailRepository {
  async getByEmail (email: string): Promise<Patient> {
    return null
  }
}

class UpdatePatientRepositoryStub implements IUpdatePatientRepository {
  async updateAndReload (patientId: string, params: UpdatePatientRepositoryParams): Promise<Patient> {
    return mockResponse
  }
}

type SutTypes = {
  sut: UpdatePatientUsecase
  getPatientByIdRepositoryStub: GetPatientByIdRepositoryStub
  getPatientByEmailRepositoryStub: GetPatientByEmailRepositoryStub
  updatePatientRepositoryStub: UpdatePatientRepositoryStub
}

const sutFactory = (): SutTypes => {
  const updatePatientRepositoryStub = new UpdatePatientRepositoryStub()
  const getPatientByEmailRepositoryStub = new GetPatientByEmailRepositoryStub()
  const getPatientByIdRepositoryStub = new GetPatientByIdRepositoryStub()
  const sut = new UpdatePatientUsecase(getPatientByIdRepositoryStub, getPatientByEmailRepositoryStub, updatePatientRepositoryStub)
  return {
    sut,
    getPatientByIdRepositoryStub,
    getPatientByEmailRepositoryStub,
    updatePatientRepositoryStub
  }
}

describe('Update Patient Usecase', () => {
  test('Should call GetPatientByIdRepository with correct id', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getPatientByIdRepositoryStub, 'getById')
    await sut.execute(mockRequestId, mockRequest)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequestId)
  })

  test('Should throw PatientNotFoundError if GetPatientByIdRepository returns null', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByIdRepositoryStub, 'getById').mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.execute(mockRequestId, mockRequest)
    await expect(promise).rejects.toThrow(PatientNotFoundError)
  })

  test('Should throw if GetPatientByIdRepository throws', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByIdRepositoryStub, 'getById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequestId, mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should not call GetPatientByEmailRepository if theres no email in params request', async () => {
    const { sut, getPatientByEmailRepositoryStub } = sutFactory()
    const { email, ...requestWithoutEmail } = mockRequest
    const getByEmailSpy = jest.spyOn(getPatientByEmailRepositoryStub, 'getByEmail')
    await sut.execute(mockRequestId, requestWithoutEmail)
    expect(getByEmailSpy).not.toBeCalled()
  })

  test('Should call GetPatientByEmailRepository with correct email', async () => {
    const { sut, getPatientByEmailRepositoryStub } = sutFactory()
    const getByEmailSpy = jest.spyOn(getPatientByEmailRepositoryStub, 'getByEmail')
    await sut.execute(mockRequestId, mockRequest)
    expect(getByEmailSpy).toHaveBeenCalledWith(mockRequest.email)
  })

  test('Should throw EmailAlreadyInUseError if GetPatientByEmail returns a patient', async () => {
    const { sut, getPatientByEmailRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByEmailRepositoryStub, 'getByEmail').mockReturnValueOnce(Promise.resolve(mockResponse))
    const promise = sut.execute(mockRequestId, mockRequest)
    await expect(promise).rejects.toThrow(EmailAlreadyInUseError)
  })

  test('Should throw if GetPatientByEmail throws', async () => {
    const { sut, getPatientByEmailRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByEmailRepositoryStub, 'getByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequestId, mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdatePatientRepository with correct values', async () => {
    const { sut, updatePatientRepositoryStub } = sutFactory()
    const updateSpy = jest.spyOn(updatePatientRepositoryStub, 'updateAndReload')
    await sut.execute(mockRequestId, mockRequest)
    expect(updateSpy).toHaveBeenCalledWith(mockRequestId, mockRequest)
  })
})
