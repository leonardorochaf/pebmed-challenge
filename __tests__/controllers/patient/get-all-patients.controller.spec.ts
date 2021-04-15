
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import faker from 'faker'
import { Request, Response } from 'express'

import { IGetAllPatientsUsecase } from '../../../src/usecases/patient/interface/get-all-patients.usecase.interface'
import { DefaultPatientResponse } from '../../../src/dtos/patient/default-patient-response'
import { GetAllPatientsController } from '../../../src/controllers/patient/get-all-patients.controller'
import { serverErrorMessage } from '../../../src/utils/strings'
import { Gender } from '../../../src/utils/gender-enum'

const req: Request = {} as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

const mockGetAllPatientsUsecaseResponse = [{
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  birthday: faker.date.past(),
  gender: Gender.MASCULINO,
  height: faker.datatype.float({ min: 0, max: 2.5 }),
  weight: faker.datatype.float({ min: 0, max: 100 })
}]

class GetAllPatientsUsecaseStub implements IGetAllPatientsUsecase {
  async execute (): Promise<DefaultPatientResponse[]> {
    return mockGetAllPatientsUsecaseResponse
  }
}

type SutTypes = {
  sut: GetAllPatientsController
  getAllPatientsUsecaseStub: GetAllPatientsUsecaseStub
}

const sutFactory = (): SutTypes => {
  const getAllPatientsUsecaseStub = new GetAllPatientsUsecaseStub()
  const sut = new GetAllPatientsController(getAllPatientsUsecaseStub)
  return {
    sut,
    getAllPatientsUsecaseStub
  }
}

describe('Get All Patients Controller', () => {
  test('Should 500 if GetAllPatientsUsecase throws', async () => {
    const { sut, getAllPatientsUsecaseStub } = sutFactory()
    jest.spyOn(getAllPatientsUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: serverErrorMessage })
  })

  test('Should 200 and return all patients on success', async () => {
    const { sut } = sutFactory()
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockGetAllPatientsUsecaseResponse)
  })
})
