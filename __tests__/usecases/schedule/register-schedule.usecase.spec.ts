import faker from 'faker'

import { PatientNotFoundError } from '../../../src/errors/patient-not-found-error'
import { ScheduleTimeAlreadyTakenError } from '../../../src/errors/schedule-time-already-taken-error'
import { Patient } from '../../../src/models/Patient'
import { Schedule } from '../../../src/models/Schedule'
import { IGetPatientByIdRepository } from '../../../src/repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { IGetScheduleByTimeRepository } from '../../../src/repositories/schedule/interfaces/get-schedule-by-time.reposioty.interface'
import { ISaveScheduleRepository, SaveScheduleParams } from '../../../src/repositories/schedule/interfaces/save-schedule.repository.interface'
import { IDecodeToken } from '../../../src/services/jwt/interfaces/decode-token.interface'
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

const mockDecodeTokenResponse = faker.datatype.uuid()

class GetScheduleByTimeRepositoryStub implements IGetScheduleByTimeRepository {
  async getByTime (time: Date): Promise<Schedule> {
    return null
  }
}

class GetPatientByIdRepositoryStub implements IGetPatientByIdRepository {
  async getById (patientId: string): Promise<Patient> {
    return {
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
    }
  }
}

class DecodeTokenStub implements IDecodeToken {
  async decode (token: string): Promise<string> {
    return mockDecodeTokenResponse
  }
}

class SaveScheduleRepositoryStub implements ISaveScheduleRepository {
  async createAndSave (params: SaveScheduleParams): Promise<Schedule> {
    return mockSaveScheduleRepositoryResponse
  }
}

type SutTypes = {
  sut: RegisterScheduleUsecase
  getScheduleByTimeRepositoryStub: GetScheduleByTimeRepositoryStub
  getPatientByIdRepositoryStub: GetPatientByIdRepositoryStub
  decodeTokenStub: DecodeTokenStub
  saveScheduleRepositoryStub: SaveScheduleRepositoryStub
}

const sutFactory = (): SutTypes => {
  const saveScheduleRepositoryStub = new SaveScheduleRepositoryStub()
  const decodeTokenStub = new DecodeTokenStub()
  const getPatientByIdRepositoryStub = new GetPatientByIdRepositoryStub()
  const getScheduleByTimeRepositoryStub = new GetScheduleByTimeRepositoryStub()
  const sut = new RegisterScheduleUsecase(getScheduleByTimeRepositoryStub, getPatientByIdRepositoryStub, decodeTokenStub, saveScheduleRepositoryStub)
  return {
    sut,
    getScheduleByTimeRepositoryStub,
    getPatientByIdRepositoryStub,
    decodeTokenStub,
    saveScheduleRepositoryStub
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

  test('Should throw if GetScheduleByTime throws', async () => {
    const { sut, getScheduleByTimeRepositoryStub } = sutFactory()
    jest.spyOn(getScheduleByTimeRepositoryStub, 'getByTime').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call GetPatientById with correct id', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getPatientByIdRepositoryStub, 'getById')
    await sut.execute(mockRequest)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequest.patientId)
  })

  test('Should throw PatientNotFoundError if GetPatientById dont return a patient', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByIdRepositoryStub, 'getById').mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow(PatientNotFoundError)
  })

  test('Should throw if GetPatientById throws', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByIdRepositoryStub, 'getById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call DecodeToken with correct token', async () => {
    const { sut, decodeTokenStub } = sutFactory()
    const decodeSpy = jest.spyOn(decodeTokenStub, 'decode')
    await sut.execute(mockRequest)
    expect(decodeSpy).toHaveBeenCalledWith(mockRequest.token)
  })

  test('Should throw if DecodeToken throws', async () => {
    const { sut, decodeTokenStub } = sutFactory()
    jest.spyOn(decodeTokenStub, 'decode').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call SaveScheduleRepository with correct values', async () => {
    const { sut, saveScheduleRepositoryStub } = sutFactory()
    const saveSpy = jest.spyOn(saveScheduleRepositoryStub, 'createAndSave')
    await sut.execute(mockRequest)
    expect(saveSpy).toHaveBeenCalledWith({ time: mockRequest.time, patientId: mockRequest.patientId, doctorId: mockDecodeTokenResponse })
  })
})
