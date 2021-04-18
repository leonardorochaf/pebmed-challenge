import faker from 'faker'

import { Schedule } from '../../../src/models/Schedule'
import { IGetScheduleByTimeRepository } from '../../../src/repositories/schedule/interfaces/get-schedule-by-time.reposioty.interface'
import { RegisterScheduleUsecase } from '../../../src/usecases/schedule/register-schedule.usecase'

const mockRequest = {
  time: faker.date.future(),
  token: faker.datatype.uuid(),
  patientId: faker.datatype.uuid()
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
})
