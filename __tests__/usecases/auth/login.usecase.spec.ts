import faker from 'faker'
import { Doctor } from '../../../src/models/Doctor'
import { IGetDoctorByEmailRepository } from '../../../src/repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
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

type SutTypes = {
  sut: LoginUsecase
  getDoctorByEmailRepositoryStub: GetDoctorByEmailRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getDoctorByEmailRepositoryStub = new GetDoctorByEmailRepositoryStub()
  const sut = new LoginUsecase(getDoctorByEmailRepositoryStub)
  return {
    sut,
    getDoctorByEmailRepositoryStub
  }
}

describe('Login Usecase', () => {
  test('Should call GetDoctorByEmailRepository with correct email', async () => {
    const { sut, getDoctorByEmailRepositoryStub } = sutFactory()
    const getByEmailSpy = jest.spyOn(getDoctorByEmailRepositoryStub, 'getByEmail')
    await sut.execute(mockRequest)
    expect(getByEmailSpy).toHaveBeenCalledWith(mockRequest.email)
  })
})
