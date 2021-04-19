/* eslint-disable @typescript-eslint/consistent-type-assertions */
import faker from 'faker'
import { Request, Response } from 'express'

import { IValidator } from '../../../src/validation/interfaces/validator.interface'
import { ValidationError } from '../../../src/errors/validation-error'
import { CreateAppointmentValidationModel } from '../../../src/validation/validation-models/appointment/create-appointment-validation.model'
import { CreateAppointmentController } from '../../../src/controllers/appointment/create-appointment.controller'
import { serverErrorMessage } from '../../../src/utils/strings'
import { CreateAppointmentParams, ICreateAppointmentUsecase } from '../../../src/usecases/appointment/interfaces/create-appointment.usecase.interface'

const req: Request = {
  body: {
    observation: faker.random.words(),
    scheduleId: faker.datatype.uuid()
  }
} as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

class ValidatorStub implements IValidator {
  async validate (data: any, validationModel: any, skipMissingProperties: boolean): Promise<ValidationError> {
    return null
  }
}

class CreateAppointmentUsecaseStub implements ICreateAppointmentUsecase {
  async execute (params: CreateAppointmentParams): Promise<void> { }
}

type SutTypes = {
  sut: CreateAppointmentController
  validatorStub: ValidatorStub
  createAppointmentUsecaseStub: CreateAppointmentUsecaseStub
}

const sutFactory = (): SutTypes => {
  const createAppointmentUsecaseStub = new CreateAppointmentUsecaseStub()
  const validatorStub = new ValidatorStub()
  const sut = new CreateAppointmentController(validatorStub, createAppointmentUsecaseStub)
  return {
    sut,
    validatorStub,
    createAppointmentUsecaseStub
  }
}

describe('Create Appointment Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, CreateAppointmentValidationModel, false)
  })

  test('Should 400 and return validation error messages if validation fails', async () => {
    const { sut, validatorStub } = sutFactory()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(Promise.resolve(new ValidationError(['Observação é obrigatória'])))
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: [{ message: 'Observação é obrigatória' }] })
  })

  test('Should 500 and return server error message if validation throws', async () => {
    const { sut, validatorStub } = sutFactory()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: serverErrorMessage })
  })

  test('Should call CreateAppointmentUsecase with correct values', async () => {
    const { sut, createAppointmentUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(createAppointmentUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(req.body)
  })
})
