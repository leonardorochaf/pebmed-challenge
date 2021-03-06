import faker from 'faker'

import { EmailAlreadyInUseError } from '../../../src/errors/email-already-in-use-error'
import { Patient } from '../../../src/models/Patient'
import { IGetPatientByEmailRepository } from '../../../src/repositories/patient/interfaces/get-patient-by-email.repository.interface'
import { ISavePatientRepository, SavePatientData } from '../../../src/repositories/patient/interfaces/save-patient.repository.interface'
import { CreatePatientUsecase } from '../../../src/usecases/patient/create-patient.usecase'
import { Gender } from '../../../src/utils/gender-enum'

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

class GetPatientByEmailRepositoryStub implements IGetPatientByEmailRepository {
  async getByEmail (email: string): Promise<Patient> {
    return null
  }
}

class SavePatientRepositoryStub implements ISavePatientRepository {
  async createAndSave (params: SavePatientData): Promise<Patient> {
    return mockResponse
  }
}

type SutTypes = {
  sut: CreatePatientUsecase
  getPatientByEmailRepositoryStub: GetPatientByEmailRepositoryStub
  savePatientRepositoryStub: SavePatientRepositoryStub
}

const sutFactory = (): SutTypes => {
  const savePatientRepositoryStub = new SavePatientRepositoryStub()
  const getPatientByEmailRepositoryStub = new GetPatientByEmailRepositoryStub()
  const sut = new CreatePatientUsecase(getPatientByEmailRepositoryStub, savePatientRepositoryStub)
  return {
    sut,
    getPatientByEmailRepositoryStub,
    savePatientRepositoryStub
  }
}

describe('Create Patient Usecase', () => {
  test('Should call GetPatientByEmailRepository with correct email', async () => {
    const { sut, getPatientByEmailRepositoryStub } = sutFactory()
    const getByEmailSpy = jest.spyOn(getPatientByEmailRepositoryStub, 'getByEmail')
    await sut.execute(mockRequest)
    expect(getByEmailSpy).toHaveBeenCalledWith(mockRequest.email)
  })

  test('Should throw EmailAlreadyInUseError if GetPatientByEmailRepository returns a patient', async () => {
    const { sut, getPatientByEmailRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByEmailRepositoryStub, 'getByEmail').mockReturnValueOnce(Promise.resolve(mockResponse))
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow(EmailAlreadyInUseError)
  })

  test('Should throw if GetPatientByEmailRepository throws', async () => {
    const { sut, getPatientByEmailRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByEmailRepositoryStub, 'getByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call SavePatientRepository with correct values', async () => {
    const { sut, savePatientRepositoryStub } = sutFactory()
    const saveSpy = jest.spyOn(savePatientRepositoryStub, 'createAndSave')
    await sut.execute(mockRequest)
    expect(saveSpy).toHaveBeenCalledWith(mockRequest)
  })

  test('Should throw if SavePatientRepository throws', async () => {
    const { sut, savePatientRepositoryStub } = sutFactory()
    jest.spyOn(savePatientRepositoryStub, 'createAndSave').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should not have properties createdAt, updatedAt and deletedAt on returned patient', async () => {
    const { sut } = sutFactory()
    const response = await sut.execute(mockRequest)
    expect(response).not.toHaveProperty('createdAt')
    expect(response).not.toHaveProperty('updatedAt')
    expect(response).not.toHaveProperty('deletedAt')
  })
})
