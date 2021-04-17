/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { GetPatientByIdController } from '../../../src/controllers/patient/get-patient-by-id.controller'
import { DefaultPatientResponse } from '../../../src/dtos/patient/default-patient-response'
import { IGetPatientByIdUsecase } from '../../../src/usecases/patient/interface/get-patient-by-id.usecase.interface'
import { Gender } from '../../../src/utils/gender-enum'

const req: Request = {
  params: {
    id: faker.datatype.uuid()
  }
} as unknown as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

const mockGetPatientByIdUsecaseResponse = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  birthday: faker.date.past(),
  gender: Gender.MASCULINO,
  height: faker.datatype.float({ min: 0, max: 2.5 }),
  weight: faker.datatype.float({ min: 0, max: 100 })
}

class GetPatientByIdUsecaseStub implements IGetPatientByIdUsecase {
  async execute (patientId: string): Promise<DefaultPatientResponse> {
    return mockGetPatientByIdUsecaseResponse
  }
}

type SutTypes = {
  sut: GetPatientByIdController
  getPatientByIdUsecaseStub: GetPatientByIdUsecaseStub
}

const sutFactory = (): SutTypes => {
  const getPatientByIdUsecaseStub = new GetPatientByIdUsecaseStub()
  const sut = new GetPatientByIdController(getPatientByIdUsecaseStub)
  return {
    sut,
    getPatientByIdUsecaseStub
  }
}

describe('Get Patient By Id Controller', () => {
  test('Should call GetPatientByIdUsecase with correct id', async () => {
    const { sut, getPatientByIdUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(getPatientByIdUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(req.params.id)
  })
})
