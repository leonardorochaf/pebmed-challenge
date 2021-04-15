/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { SignUpController } from '../../../src/controllers/auth/sign-up.controller'
import { ValidationError } from '../../../src/errors/validation-error'
import { IValidator } from '../../../src/validation/interfaces/validator.interface'
import { SignUpValidationModel } from '../../../src/validation/validation-models/auth/sign-up.validation.model'

const mockPassword = faker.internet.password()

const req: Request = {
  body: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: mockPassword,
    passwordConfirmation: mockPassword
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
  sut: SignUpController
  validatorStub: ValidatorStub
}

const sutFactory = (): SutTypes => {
  const validatorStub = new ValidatorStub()
  const sut = new SignUpController(validatorStub)
  return {
    sut,
    validatorStub
  }
}

describe('Sign Up Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, SignUpValidationModel, false)
  })
})
