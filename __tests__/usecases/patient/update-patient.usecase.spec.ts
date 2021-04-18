import faker from 'faker'

import { Patient } from '../../../src/models/Patient'
import { IGetPatientByIdRepository } from '../../../src/repositories/patient/interfaces/get-patient-by-id.repository.interface'
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

type SutTypes = {
  sut: UpdatePatientUsecase
  getPatientByIdRepositoryStub: GetPatientByIdRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getPatientByIdRepositoryStub = new GetPatientByIdRepositoryStub()
  const sut = new UpdatePatientUsecase(getPatientByIdRepositoryStub)
  return {
    sut,
    getPatientByIdRepositoryStub
  }
}

describe('Update Patient Usecase', () => {
  test('Should call GetPatientByIdRepository with correct id', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getPatientByIdRepositoryStub, 'getById')
    await sut.execute(mockRequestId, mockRequest)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequestId)
  })
})
