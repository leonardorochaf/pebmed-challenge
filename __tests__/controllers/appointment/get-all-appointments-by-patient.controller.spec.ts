/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { DefaultAppointmentResponse } from '../../../src/dtos/appointment/default-appointment-response'
import { IGetAllAppointmentsByPatientUsecase } from '../../../src/usecases/appointment/interfaces/get-all-appointments-by-patient.usecase.interface'
import { Gender } from '../../../src/utils/gender-enum'
import { GetAllAppointmentsByPatientController } from '../../../src/controllers/appointment/get-all-appointments-by-patient'
import { serverErrorMessage } from '../../../src/utils/strings'

const req: Request = {
  params: {
    patientId: faker.datatype.uuid()
  }
} as unknown as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

const mockResponse = [{
  id: faker.datatype.uuid(),
  observation: faker.random.words(),
  schedule: {
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
}]

class GetAllAppointmentsByPatientUsecaseStub implements IGetAllAppointmentsByPatientUsecase {
  async execute (patientId: string): Promise<DefaultAppointmentResponse[]> {
    return mockResponse
  }
}

type SutTypes = {
  sut: GetAllAppointmentsByPatientController
  getAllAppointmentsByPatientUsecaseStub: GetAllAppointmentsByPatientUsecaseStub
}

const sutFactory = (): SutTypes => {
  const getAllAppointmentsByPatientUsecaseStub = new GetAllAppointmentsByPatientUsecaseStub()
  const sut = new GetAllAppointmentsByPatientController(getAllAppointmentsByPatientUsecaseStub)
  return {
    sut,
    getAllAppointmentsByPatientUsecaseStub
  }
}

describe('Get All Appointments By Patient Controller', () => {
  test('Should call GetAllAppointmentsByPatientUsecase with correct id', async () => {
    const { sut, getAllAppointmentsByPatientUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(getAllAppointmentsByPatientUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(req.params.patientId)
  })

  test('Should 500 and return server error message if GetAllAppointmentsByPatientUsecase throws', async () => {
    const { sut, getAllAppointmentsByPatientUsecaseStub } = sutFactory()
    jest.spyOn(getAllAppointmentsByPatientUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: serverErrorMessage })
  })

  test('Should 200 on success', async () => {
    const { sut } = sutFactory()
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockResponse)
  })
})
