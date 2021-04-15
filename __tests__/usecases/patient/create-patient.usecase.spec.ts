import faker from 'faker'
import { Patient } from '../../../src/models/Patient'
import { IGetPatientByEmailRepository } from '../../../src/repositories/patient/interfaces/get-patient-by-email.repository.interface'
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

class GetPatientByEmailRepositoryStub implements IGetPatientByEmailRepository {
  async getByEmail (email: string): Promise<Patient> {
    return null
  }
}

type SutTypes = {
  sut: CreatePatientUsecase
  getPatientByEmailRepositoryStub: GetPatientByEmailRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getPatientByEmailRepositoryStub = new GetPatientByEmailRepositoryStub()
  const sut = new CreatePatientUsecase(getPatientByEmailRepositoryStub)
  return {
    sut,
    getPatientByEmailRepositoryStub
  }
}

describe('Create Patient Usecase', () => {
  test('Should call GetPatientByEmailRepository with correct email', async () => {
    const { sut, getPatientByEmailRepositoryStub } = sutFactory()
    const getByEmailSpy = jest.spyOn(getPatientByEmailRepositoryStub, 'getByEmail')
    await sut.execute(mockRequest)
    expect(getByEmailSpy).toHaveBeenCalledWith(mockRequest.email)
  })
})
