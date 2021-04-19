import faker from 'faker'
import { ScheduleNotFoundError } from '../../../src/errors/schedule-not-found-error'

import { Schedule } from '../../../src/models/Schedule'
import { IGetScheduleByIdRepository } from '../../../src/repositories/schedule/interfaces/get-schedule-by-id.repository'
import { DeleteScheduleUsecase } from '../../../src/usecases/schedule/delete-schedule.usecase'
import { Gender } from '../../../src/utils/gender-enum'

const mockRequestId = faker.datatype.uuid()

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
  sut: DeleteScheduleUsecase
  getScheduleByIdRepositoryStub: GetScheduleByIdRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getScheduleByIdRepositoryStub = new GetScheduleByIdRepositoryStub()
  const sut = new DeleteScheduleUsecase(getScheduleByIdRepositoryStub)
  return {
    sut,
    getScheduleByIdRepositoryStub
  }
}

describe('Delete Schedule Usecase', () => {
  test('Should call GetScheduleByIdRepository with correct id', async () => {
    const { sut, getScheduleByIdRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getScheduleByIdRepositoryStub, 'getById')
    await sut.execute(mockRequestId)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequestId)
  })

  test('Should throw ScheduleNotFoundError if GetScheduleByIdRepository returns null', async () => {
    const { sut, getScheduleByIdRepositoryStub } = sutFactory()
    jest.spyOn(getScheduleByIdRepositoryStub, 'getById').mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.execute(mockRequestId)
    await expect(promise).rejects.toThrow(ScheduleNotFoundError)
  })

  test('Should throw if GetScheduleByIdRepository throws', async () => {
    const { sut, getScheduleByIdRepositoryStub } = sutFactory()
    jest.spyOn(getScheduleByIdRepositoryStub, 'getById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequestId)
    await expect(promise).rejects.toThrow()
  })
})
