import faker from 'faker'

import { Schedule } from '../../../src/models/Schedule'
import { IGetScheduleByIdRepository } from '../../../src/repositories/schedule/interfaces/get-schedule-by-id.repository'
import { UpdateScheduleUsecase } from '../../../src/usecases/schedule/update-schedule.usecase'
import { Gender } from '../../../src/utils/gender-enum'

const mockRequestId = faker.datatype.uuid()

const mockRequestParams = {
  time: faker.date.future()
}

const mockResponse = {
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
}

class GetScheduleByIdRepositoryStub implements IGetScheduleByIdRepository {
  async getById (scheduleId: string): Promise<Schedule> {
    return mockResponse
  }
}

type SutTypes = {
  sut: UpdateScheduleUsecase
  getScheduleByIdRepositoryStub: GetScheduleByIdRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getScheduleByIdRepositoryStub = new GetScheduleByIdRepositoryStub()
  const sut = new UpdateScheduleUsecase(getScheduleByIdRepositoryStub)
  return {
    sut,
    getScheduleByIdRepositoryStub
  }
}

describe('Update Schedule Usecase', () => {
  test('Should call GetScheduleById with correct id', async () => {
    const { sut, getScheduleByIdRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getScheduleByIdRepositoryStub, 'getById')
    await sut.execute(mockRequestId, mockRequestParams)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequestId)
  })
})
