import faker from 'faker'

import { Patient } from '../../../src/models/Patient'
import { IGetAllPatientsRepository } from '../../../src/repositories/patient/interfaces/get-all-patients.repository.interface'
import { GetAllPatientsUsecase } from '../../../src/usecases/patient/get-all-patients.usecase'
import { Gender } from '../../../src/utils/gender-enum'

const mockResponse = [{
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
}]

class GetAllPatientsRepositoryStub implements IGetAllPatientsRepository {
  async getAll (): Promise<Patient[]> {
    return mockResponse
  }
}

type SutTypes = {
  sut: GetAllPatientsUsecase
  getAllPatientsRepositoryStub: GetAllPatientsRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getAllPatientsRepositoryStub = new GetAllPatientsRepositoryStub()
  const sut = new GetAllPatientsUsecase(getAllPatientsRepositoryStub)
  return {
    sut,
    getAllPatientsRepositoryStub
  }
}

describe('Get All Patients Usecase', () => {
  test('Should throw if GetAllPatientsRepository throws', async () => {
    const { sut, getAllPatientsRepositoryStub } = sutFactory()
    jest.spyOn(getAllPatientsRepositoryStub, 'getAll').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute()
    await expect(promise).rejects.toThrow()
  })

  test('Should not have properties createdAt, updatedAt and deletedAt on returned patients', async () => {
    const { sut } = sutFactory()
    const allPatients = await sut.execute()
    allPatients.forEach(patient => {
      expect(patient).not.toHaveProperty('createdAt')
      expect(patient).not.toHaveProperty('updatedAt')
      expect(patient).not.toHaveProperty('deletedAt')
    })
  })
})
