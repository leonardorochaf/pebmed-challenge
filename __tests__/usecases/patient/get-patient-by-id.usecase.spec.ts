import faker from 'faker'
import { PatientNotFoundError } from '../../../src/errors/patient-not-found-error'
import { Patient } from '../../../src/models/Patient'
import { IGetPatientByIdRepository } from '../../../src/repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { GetPatientByIdUsecase } from '../../../src/usecases/patient/get-patient-by-id.usecase'

import { Gender } from '../../../src/utils/gender-enum'

const mockRequestId = faker.datatype.uuid()

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

type SutTypes = {
  sut: GetPatientByIdUsecase
  getPatientByIdRepositoryStub: GetPatientByIdRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getPatientByIdRepositoryStub = new GetPatientByIdRepositoryStub()
  const sut = new GetPatientByIdUsecase(getPatientByIdRepositoryStub)
  return {
    sut,
    getPatientByIdRepositoryStub
  }
}

describe('Get Patient By Id Usecase', () => {
  test('Should call GetPatientByIdRepository with correct id', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getPatientByIdRepositoryStub, 'getById')
    await sut.execute(mockRequestId)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequestId)
  })

  test('Should throw PatientNotFoundError if GetPatientByIdRepository returns null', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByIdRepositoryStub, 'getById').mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.execute(mockRequestId)
    await expect(promise).rejects.toThrow(PatientNotFoundError)
  })

  test('Should throw if GetPatientByIdRepository throws', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByIdRepositoryStub, 'getById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequestId)
    await expect(promise).rejects.toThrow()
  })

  test('Should not have properties createdAt, updatedAt and deletedAt on returned patient', async () => {
    const { sut } = sutFactory()
    const response = await sut.execute(mockRequestId)
    expect(response).not.toHaveProperty('createdAt')
    expect(response).not.toHaveProperty('updatedAt')
    expect(response).not.toHaveProperty('deletedAt')
  })
})
