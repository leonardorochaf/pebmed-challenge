/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { UpdateScheduleController } from '../../../src/controllers/schedule/update-schedule.controller'
import { DefaultScheduleResponse } from '../../../src/dtos/schedule/default-schedule-response'
import { ScheduleNotFoundError } from '../../../src/errors/schedule-not-found-error'
import { ValidationError } from '../../../src/errors/validation-error'
import { IUpdateScheduleUsecase, UpdateScheduleParams } from '../../../src/usecases/schedule/interfaces/update-schedule.usecase.interface'
import { Gender } from '../../../src/utils/gender-enum'
import { serverErrorMessage } from '../../../src/utils/strings'
import { IValidator } from '../../../src/validation/interfaces/validator.interface'

import { UpdateScheduleValidatonModel } from '../../../src/validation/validation-models/schedule/update-schedule-validation.model'

const req: Request = {
  params: {
    patiendId: faker.datatype.uuid()
  },
  body: {
    time: faker.date.future()
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

class ValidatorStub implements IValidator {
  async validate (data: any, validationModel: any, skipMissingProperties: boolean): Promise<ValidationError> {
    return null
  }
}

class UpdateScheduleUsecaseStub implements IUpdateScheduleUsecase {
  async execute (scheduleId: string, params: UpdateScheduleParams): Promise<DefaultScheduleResponse> {
    return mockResponse
  }
}

type SutTypes = {
  sut: UpdateScheduleController
  validatorStub: ValidatorStub
  updateScheduleUsecaseStub: UpdateScheduleUsecaseStub
}

const sutFactory = (): SutTypes => {
  const updateScheduleUsecaseStub = new UpdateScheduleUsecaseStub()
  const validatorStub = new ValidatorStub()
  const sut = new UpdateScheduleController(validatorStub, updateScheduleUsecaseStub)
  return {
    sut,
    validatorStub,
    updateScheduleUsecaseStub
  }
}

describe('Update Schedule Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, UpdateScheduleValidatonModel, true)
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

  test('Should call Validator with correct values', async () => {
    const { sut, updateScheduleUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(updateScheduleUsecaseStub, 'execute')
    const time = req.body.time
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(req.params.patientId, { time })
  })

  test('Should 404 and return default message if UpdateScheduleUsecae throw ScheduleNotFoundError', async () => {
    const { sut, updateScheduleUsecaseStub } = sutFactory()
    jest.spyOn(updateScheduleUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new ScheduleNotFoundError()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Agendamento não encontrado' })
  })
})
