/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { DeletePatientController } from '../../../src/controllers/patient/delete-patient.controller'
import { IDeletePatientUsecase } from '../../../src/usecases/patient/interface/delete-patient.usecase.interface'

const req: Request = {
  params: {
    id: faker.datatype.uuid()
  }
} as unknown as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

class DeletePatientUsecaseStub implements IDeletePatientUsecase {
  async execute (patientId: string): Promise<void> { }
}

type SutTypes = {
  sut: DeletePatientController
  deletePatientUsecaseStub: DeletePatientUsecaseStub
}

const sutFactory = (): SutTypes => {
  const deletePatientUsecaseStub = new DeletePatientUsecaseStub()
  const sut = new DeletePatientController(deletePatientUsecaseStub)
  return {
    sut,
    deletePatientUsecaseStub
  }
}

describe('Delete Patient Controller', () => {
  test('Should call DeletePatientUsecase with correct id', async () => {
    const { sut, deletePatientUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(deletePatientUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(req.params.id)
  })
})
