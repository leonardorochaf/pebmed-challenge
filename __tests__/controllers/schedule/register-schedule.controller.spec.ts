/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { RegisterScheduleController } from '../../../src/controllers/schedule/register-schedule.controller'
import { ValidationError } from '../../../src/errors/validation-error'
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

class ValidatorStub implements IValidator {
  async validate (data: any, validationModel: any, skipMissingProperties: boolean): Promise<ValidationError> {
    return null
  }
}

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

type SutTypes = {
  sut: RegisterScheduleController
  validatorStub: ValidatorStub
}

const sutFactory = (): SutTypes => {
  const validatorStub = new ValidatorStub()
  const sut = new RegisterScheduleController(validatorStub)
  return {
    sut,
    validatorStub
  }
}

describe('Register Schedule Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, RegisterScheduleValidatonModel, false)
  })
})
