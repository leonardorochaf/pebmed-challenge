/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { RegisterScheduleController } from '../../../src/controllers/schedule/register-schedule.controller'
import { DefaultScheduleResponse } from '../../../src/dtos/schedule/default-schedule-response'
import { ScheduleTimeAlreadyTakenError } from '../../../src/errors/schedule-time-already-taken-error'
import { ValidationError } from '../../../src/errors/validation-error'
import { IRegisterScheduleUsecase, RegisterScheduleParams } from '../../../src/usecases/schedule/interfaces/register-schedule.usecase.interface'
import { Gender } from '../../../src/utils/gender-enum'
import { serverErrorMessage } from '../../../src/utils/strings'
import { IValidator } from '../../../src/validation/interfaces/validator.interface'

import { RegisterScheduleValidatonModel } from '../../../src/validation/validation-models/schedule/register-schedule-validation.model'

const req: Request = {
  headers: {
    'x-auth-token': faker.datatype.uuid()
  },
  body: {
    time: faker.date.future(),
    patientId: faker.datatype.uuid()
  }
} as unknown as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

const mockRegisterScheduleUsecaseResponse = {
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

class ValidatorStub implements IValidator {
  async validate (data: any, validationModel: any, skipMissingProperties: boolean): Promise<ValidationError> {
    return null
  }
}

class RegisterScheduleUsecaseStub implements IRegisterScheduleUsecase {
  async execute (params: RegisterScheduleParams): Promise<DefaultScheduleResponse> {
    return mockRegisterScheduleUsecaseResponse
  }
}

type SutTypes = {
  sut: RegisterScheduleController
  validatorStub: ValidatorStub
  registerScheduleUsecaseStub: RegisterScheduleUsecaseStub
}

const sutFactory = (): SutTypes => {
  const registerScheduleUsecaseStub = new RegisterScheduleUsecaseStub()
  const validatorStub = new ValidatorStub()
  const sut = new RegisterScheduleController(validatorStub, registerScheduleUsecaseStub)
  return {
    sut,
    validatorStub,
    registerScheduleUsecaseStub
  }
}

describe('Register Schedule Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, RegisterScheduleValidatonModel, false)
  })

  test('Should 400 and return validation error messages if validation fails', async () => {
    const { sut, validatorStub } = sutFactory()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(Promise.resolve(new ValidationError(['Data inválida'])))
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: [{ message: 'Data inválida' }] })
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

  test('Should call RegisterScheduleUsecase with correct values', async () => {
    const { sut, registerScheduleUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(registerScheduleUsecaseStub, 'execute')
    const { time, patientId } = req.body
    const token = String(req.headers['x-auth-token'])
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith({ time, token, patientId })
  })

  test('Should 400 and return default message if RegisterScheduleUsecase throw ScheduleTimeAlreadyTakenError', async () => {
    const { sut, registerScheduleUsecaseStub } = sutFactory()
    jest.spyOn(registerScheduleUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new ScheduleTimeAlreadyTakenError()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Horário para agendamento já cadastrado' })
  })

  test('Should 500 and return server error message if RegisterScheduleUsecase throws', async () => {
    const { sut, registerScheduleUsecaseStub } = sutFactory()
    jest.spyOn(registerScheduleUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: serverErrorMessage })
  })
})
