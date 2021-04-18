import faker from 'faker'

import { Schedule } from '../../../src/models/Schedule'
import { IGetAllSchedulesByDoctorRepository } from '../../../src/repositories/schedule/interfaces/get-all-schedules-by-doctor.repository.interface'
import { IDecodeToken } from '../../../src/services/jwt/interfaces/decode-token.interface'
import { GetAllSchedulesByDoctorUsecase } from '../../../src/usecases/schedule/get-all-schedules-by-doctor.usecase'
import { Gender } from '../../../src/utils/gender-enum'

const mockRequestToken = faker.datatype.uuid()

const mockDecodeTokenResponse = faker.datatype.uuid()

const mockResponse = [{
  id: faker.datatype.uuid(),
  time: faker.date.future(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
  patient: {
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
  },
  doctor: null
}]

class DecodeTokenStub implements IDecodeToken {
  async decode (token: string): Promise<string> {
    return mockDecodeTokenResponse
  }
}

class GetAllSchedulesByDoctorRepositoryStub implements IGetAllSchedulesByDoctorRepository {
  async getAllByDoctor (doctorId: string): Promise<Schedule[]> {
    return mockResponse
  }
}

type SutTypes = {
  sut: GetAllSchedulesByDoctorUsecase
  decodeTokenStub: DecodeTokenStub
  getAllSchedulesByDoctorRepositoryStub: GetAllSchedulesByDoctorRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getAllSchedulesByDoctorRepositoryStub = new GetAllSchedulesByDoctorRepositoryStub()
  const decodeTokenStub = new DecodeTokenStub()
  const sut = new GetAllSchedulesByDoctorUsecase(decodeTokenStub, getAllSchedulesByDoctorRepositoryStub)
  return {
    sut,
    decodeTokenStub,
    getAllSchedulesByDoctorRepositoryStub
  }
}

describe('Get All Schedules By Doctor Usecase', () => {
  test('Should call DecodeToken with correct token', async () => {
    const { sut, decodeTokenStub } = sutFactory()
    const decodeSpy = jest.spyOn(decodeTokenStub, 'decode')
    await sut.execute(mockRequestToken)
    expect(decodeSpy).toHaveBeenCalledWith(mockRequestToken)
  })

  test('Should throw if DecodeToken throws', async () => {
    const { sut, decodeTokenStub } = sutFactory()
    jest.spyOn(decodeTokenStub, 'decode').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockDecodeTokenResponse)
    await expect(promise).rejects.toThrow()
  })

  test('Should call GetAllSchedulesByDoctorRepository with correct id', async () => {
    const { sut, getAllSchedulesByDoctorRepositoryStub } = sutFactory()
    const getAllByDoctorSpy = jest.spyOn(getAllSchedulesByDoctorRepositoryStub, 'getAllByDoctor')
    await sut.execute(mockRequestToken)
    expect(getAllByDoctorSpy).toHaveBeenCalledWith(mockDecodeTokenResponse)
  })
})
