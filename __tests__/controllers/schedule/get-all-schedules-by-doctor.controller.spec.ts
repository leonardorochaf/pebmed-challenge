/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { GetAllSchedulesByDoctorController } from '../../../src/controllers/schedule/get-all-schedules-by-doctor.controller'
import { DefaultScheduleResponse } from '../../../src/dtos/schedule/default-schedule-response'
import { IGetAllSchedulesByDoctorUsecase } from '../../../src/usecases/schedule/interfaces/get-all-schedules-by-doctor.usecase.interface'
import { Gender } from '../../../src/utils/gender-enum'

const req: Request = {
  headers: {
    'x-auth-token': faker.datatype.uuid()
  }
} as unknown as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

const mockResponse = {
  id: faker.datatype.uuid(),
  time: faker.date.future(),
  patient: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    birthday: faker.date.past(),
    gender: Gender.MASCULINO,
    height: faker.datatype.float({ min: 0, max: 2.5 }),
    weight: faker.datatype.float({ min: 0, max: 100 })
  }
}

class GetAllSchedulesByDoctorUsecaseStub implements IGetAllSchedulesByDoctorUsecase {
  async execute (token: string): Promise<DefaultScheduleResponse[]> {
    return [
      mockResponse
    ]
  }
}

type SutTypes = {
  sut: GetAllSchedulesByDoctorController
  getAllSchedulesByDoctorUsecaseStub: GetAllSchedulesByDoctorUsecaseStub
}

const sutFactory = (): SutTypes => {
  const getAllSchedulesByDoctorUsecaseStub = new GetAllSchedulesByDoctorUsecaseStub()
  const sut = new GetAllSchedulesByDoctorController(getAllSchedulesByDoctorUsecaseStub)
  return {
    sut,
    getAllSchedulesByDoctorUsecaseStub
  }
}

describe('Get All Schedules By Doctor Controller', () => {
  test('Shoul call GetAllSchedulesByDoctorUsecase with correct token', async () => {
    const { sut, getAllSchedulesByDoctorUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(getAllSchedulesByDoctorUsecaseStub, 'execute')
    const token = String(req.headers['x-auth-token'])
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(token)
  })
})
