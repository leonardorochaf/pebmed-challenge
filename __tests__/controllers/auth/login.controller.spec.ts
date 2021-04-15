/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { LoginController } from '../../../src/controllers/auth/login.controller'
import { ValidationError } from '../../../src/errors/validation-error'
import { IValidator } from '../../../src/validation/interfaces/validator.interface'
import { LoginValidationModel } from '../../../src/validation/validation-models/auth/login-validation.model'

const req: Request = {
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
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

type SutTypes = {
  sut: LoginController
  validatorStub: ValidatorStub
}

const sutFactory = (): SutTypes => {
  const validatorStub = new ValidatorStub()
  const sut = new LoginController(validatorStub)
  return {
    sut,
    validatorStub
  }
}

describe('Login Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, LoginValidationModel, false)
  })
})
