/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { DeletePatientController } from '../../../src/controllers/patient/delete-patient.controller'
import { PatientNotFoundError } from '../../../src/errors/patient-not-found-error'
import { IDeletePatientUsecase } from '../../../src/usecases/patient/interface/delete-patient.usecase.interface'
import { serverErrorMessage } from '../../../src/utils/strings'

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

  test('Should 404 and return default message if DeletePatientUsecase throw PatientNotFoundError', async () => {
    const { sut, deletePatientUsecaseStub } = sutFactory()
    jest.spyOn(deletePatientUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new PatientNotFoundError()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenLastCalledWith(404)
    expect(res.json).toHaveBeenLastCalledWith({ error: 'Paciente não encontrado' })
  })

  test('Should 500 and return server erorr message if DeletePatientUsecase throws', async () => {
    const { sut, deletePatientUsecaseStub } = sutFactory()
    jest.spyOn(deletePatientUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenLastCalledWith(500)
    expect(res.json).toHaveBeenLastCalledWith({ error: serverErrorMessage })
  })

  test('Should 204 on success', async () => {
    const { sut } = sutFactory()
    await sut.handle(req, res)
    expect(res.status).toHaveBeenLastCalledWith(204)
    expect(res.json).toHaveBeenLastCalledWith()
  })
})
