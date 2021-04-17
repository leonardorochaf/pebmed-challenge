import faker from 'faker'

import { Patient } from '../../../src/models/Patient'
import { IGetPatientByIdRepository } from '../../../src/repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { DeletePatientUsecase } from '../../../src/usecases/patient/delete-patient.usecase'
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
  sut: DeletePatientUsecase
  getPatientByIdRepositoryStub: GetPatientByIdRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getPatientByIdRepositoryStub = new GetPatientByIdRepositoryStub()
  const sut = new DeletePatientUsecase(getPatientByIdRepositoryStub)
  return {
    sut,
    getPatientByIdRepositoryStub
  }
}

describe('Delete Patient Usecase', () => {
  test('Should call GetPatientByIdRepository with correct id', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getPatientByIdRepositoryStub, 'getById')
    await sut.execute(mockRequestId)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequestId)
  })
})
