import faker from 'faker'
import { ScheduleNotFoundError } from '../../../src/errors/schedule-not-found-error'
import { ScheduleTimeAlreadyTakenError } from '../../../src/errors/schedule-time-already-taken-error'

import { Schedule } from '../../../src/models/Schedule'
import { IGetScheduleByIdRepository } from '../../../src/repositories/schedule/interfaces/get-schedule-by-id.repository'
import { IGetScheduleByTimeRepository } from '../../../src/repositories/schedule/interfaces/get-schedule-by-time.reposioty.interface'
import { IUpdateScheduleRepository, UpdateScheduleData } from '../../../src/repositories/schedule/interfaces/update-schedule.repository.interface'
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

class GetScheduleByTimeRepositoryStub implements IGetScheduleByTimeRepository {
  async getByTime (time: Date): Promise<Schedule> {
    return null
  }
}

class UpdateScheduleRepositoryStub implements IUpdateScheduleRepository {
  async updateAndReload (scheduleId: string, data: UpdateScheduleData): Promise<Schedule> {
    return mockResponse
  }
}

type SutTypes = {
  sut: UpdateScheduleUsecase
  getScheduleByIdRepositoryStub: GetScheduleByIdRepositoryStub
  getScheduleByTimeRepositoryStub: GetScheduleByTimeRepositoryStub
  updateScheduleRepositoryStub: UpdateScheduleRepositoryStub
}

const sutFactory = (): SutTypes => {
  const updateScheduleRepositoryStub = new UpdateScheduleRepositoryStub()
  const getScheduleByTimeRepositoryStub = new GetScheduleByTimeRepositoryStub()
  const getScheduleByIdRepositoryStub = new GetScheduleByIdRepositoryStub()
  const sut = new UpdateScheduleUsecase(getScheduleByIdRepositoryStub, getScheduleByTimeRepositoryStub, updateScheduleRepositoryStub)
  return {
    sut,
    getScheduleByIdRepositoryStub,
    getScheduleByTimeRepositoryStub,
    updateScheduleRepositoryStub
  }
}

describe('Update Schedule Usecase', () => {
  test('Should call GetScheduleByIdRespository with correct id', async () => {
    const { sut, getScheduleByIdRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getScheduleByIdRepositoryStub, 'getById')
    await sut.execute(mockRequestId, mockRequestParams)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequestId)
  })

  test('Should throw ScheduleNotFoundError if GetScheduleByIdRespository returns null', async () => {
    const { sut, getScheduleByIdRepositoryStub } = sutFactory()
    jest.spyOn(getScheduleByIdRepositoryStub, 'getById').mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.execute(mockRequestId, mockRequestParams)
    await expect(promise).rejects.toThrow(ScheduleNotFoundError)
  })

  test('Should throw ScheduleNotFoundError if GetScheduleByIdRespository returns null', async () => {
    const { sut, getScheduleByIdRepositoryStub } = sutFactory()
    jest.spyOn(getScheduleByIdRepositoryStub, 'getById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequestId, mockRequestParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should call GetScheduleByTimeRepository with correct value', async () => {
    const { sut, getScheduleByTimeRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getScheduleByTimeRepositoryStub, 'getByTime')
    await sut.execute(mockRequestId, mockRequestParams)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequestParams.time)
  })

  test('Should throw ScheduleTimeAlreadyTakenError if GetScheduleByTime returns a schedule', async () => {
    const { sut, getScheduleByTimeRepositoryStub } = sutFactory()
    jest.spyOn(getScheduleByTimeRepositoryStub, 'getByTime').mockReturnValueOnce(Promise.resolve(mockResponse))
    const promise = sut.execute(mockRequestId, mockRequestParams)
    await expect(promise).rejects.toThrow(ScheduleTimeAlreadyTakenError)
  })

  test('Should throw if GetScheduleByTime throws', async () => {
    const { sut, getScheduleByTimeRepositoryStub } = sutFactory()
    jest.spyOn(getScheduleByTimeRepositoryStub, 'getByTime').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequestId, mockRequestParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateScheduleRepository with correct values', async () => {
    const { sut, updateScheduleRepositoryStub } = sutFactory()
    const updateAndReloadSpy = jest.spyOn(updateScheduleRepositoryStub, 'updateAndReload')
    await sut.execute(mockRequestId, mockRequestParams)
    expect(updateAndReloadSpy).toHaveBeenCalledWith(mockRequestId, mockRequestParams)
  })
})
