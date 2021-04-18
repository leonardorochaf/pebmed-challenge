import faker from 'faker'
import { ScheduleTimeAlreadyTakenError } from '../../../src/errors/schedule-time-already-taken-error'

import { Schedule } from '../../../src/models/Schedule'
import { IGetScheduleByTimeRepository } from '../../../src/repositories/schedule/interfaces/get-schedule-by-time.reposioty.interface'
import { RegisterScheduleUsecase } from '../../../src/usecases/schedule/register-schedule.usecase'
import { Gender } from '../../../src/utils/gender-enum'

const mockRequest = {
  time: faker.date.future(),
  token: faker.datatype.uuid(),
  patientId: faker.datatype.uuid()
}

const mockSaveScheduleRepositoryResponse = {
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

class GetScheduleByTimeRepositoryStub implements IGetScheduleByTimeRepository {
  async getByTime (time: Date): Promise<Schedule> {
    return null
  }
}

type SutTypes = {
  sut: RegisterScheduleUsecase
  getScheduleByTimeRepositoryStub: GetScheduleByTimeRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getScheduleByTimeRepositoryStub = new GetScheduleByTimeRepositoryStub()
  const sut = new RegisterScheduleUsecase(getScheduleByTimeRepositoryStub)
  return {
    sut,
    getScheduleByTimeRepositoryStub
  }
}

describe('Register Schedule Usecase', () => {
  test('Should call GetScheduleByTime with correct time', async () => {
    const { sut, getScheduleByTimeRepositoryStub } = sutFactory()
    const getByTimeSpy = jest.spyOn(getScheduleByTimeRepositoryStub, 'getByTime')
    await sut.execute(mockRequest)
    expect(getByTimeSpy).toHaveBeenCalledWith(mockRequest.time)
  })

  test('Should throw ScheduleTimeAlreadyTakenError if GetScheduleByTime returns a schedule', async () => {
    const { sut, getScheduleByTimeRepositoryStub } = sutFactory()
    jest.spyOn(getScheduleByTimeRepositoryStub, 'getByTime').mockReturnValueOnce(Promise.resolve(mockSaveScheduleRepositoryResponse))
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow(ScheduleTimeAlreadyTakenError)
  })
})
