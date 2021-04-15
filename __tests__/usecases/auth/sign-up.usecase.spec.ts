import faker from 'faker'

import { Doctor } from '../../../src/models/Doctor'
import { IGetDoctorByEmailRepository } from '../../../src/repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { SignUpUsecase } from '../../../src/usecases/auth/sign-up.usecase'

const mockRequest = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

class GetDoctorByEmailRepositoryStub implements IGetDoctorByEmailRepository {
  async getByEmail (email: string): Promise<Doctor> {
    return null
  }
}

type SutTypes = {
  sut: SignUpUsecase
  getDoctorByEmailRepositoryStub: GetDoctorByEmailRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getDoctorByEmailRepositoryStub = new GetDoctorByEmailRepositoryStub()
  const sut = new SignUpUsecase(getDoctorByEmailRepositoryStub)
  return {
    sut,
    getDoctorByEmailRepositoryStub
  }
}

describe('sign Up Usecase', () => {
  test('Should call GetDoctorByEmailRepository with correct email', async () => {
    const { sut, getDoctorByEmailRepositoryStub } = sutFactory()
    const getByEmailSpy = jest.spyOn(getDoctorByEmailRepositoryStub, 'getByEmail')
    await sut.execute(mockRequest)
    expect(getByEmailSpy).toHaveBeenCalledWith(mockRequest.email)
  })
})
