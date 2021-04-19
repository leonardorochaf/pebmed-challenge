import faker from 'faker'

import { ISaveAppointmentRepository, SaveAppointmentParams } from '../../../src/repositories/appointment/interfaces/save-appointment.repository.interface'
import { CreateAppointmentUsecase } from '../../../src/usecases/appointment/create-appointment.usecase'

const mockRequest = {
  observation: faker.random.words(),
  scheduleId: faker.datatype.uuid()
}

class SaveAppointmentRepositoryStub implements ISaveAppointmentRepository {
  async createAndSave (params: SaveAppointmentParams): Promise<void> { }
}

type SutTypes = {
  sut: CreateAppointmentUsecase
  saveAppointmentRepositoryStub: SaveAppointmentRepositoryStub
}

const sutFactory = (): SutTypes => {
  const saveAppointmentRepositoryStub = new SaveAppointmentRepositoryStub()
  const sut = new CreateAppointmentUsecase(saveAppointmentRepositoryStub)
  return {
    sut,
    saveAppointmentRepositoryStub
  }
}

describe('Create Appointment Usecase', () => {
  test('Should call SaveAppointmentRepository with correct values', async () => {
    const { sut, saveAppointmentRepositoryStub } = sutFactory()
    const createAndSaveSpy = jest.spyOn(saveAppointmentRepositoryStub, 'createAndSave')
    await sut.execute(mockRequest)
    expect(createAndSaveSpy).toHaveBeenCalledWith(mockRequest)
  })
})
