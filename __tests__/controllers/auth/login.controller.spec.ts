/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { LoginController } from '../../../src/controllers/auth/login.controller'
import { LoginResponse } from '../../../src/dtos/auth/login-response'
import { InvalidCredentialsError } from '../../../src/errors/InvalidCredentialsError'
import { ValidationError } from '../../../src/errors/validation-error'
import { ILoginUsecase, LoginUsecaseParams } from '../../../src/usecases/auth/interfaces/login.usecase.interface'
import { serverErrorMessage } from '../../../src/utils/strings'
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

const mockResponse = {
  token: faker.datatype.uuid()
}

class ValidatorStub implements IValidator {
  async validate (data: any, validationModel: any, skipMissingProperties: boolean): Promise<ValidationError> {
    return null
  }
}

class LoginUsecaseStub implements ILoginUsecase {
  async execute (params: LoginUsecaseParams): Promise<LoginResponse> {
    return mockResponse
  }
}

type SutTypes = {
  sut: LoginController
  validatorStub: ValidatorStub
  loginUsecaseStub: LoginUsecaseStub
}

const sutFactory = (): SutTypes => {
  const loginUsecaseStub = new LoginUsecaseStub()
  const validatorStub = new ValidatorStub()
  const sut = new LoginController(validatorStub, loginUsecaseStub)
  return {
    sut,
    validatorStub,
    loginUsecaseStub
  }
}

describe('Login Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, LoginValidationModel, false)
  })

  test('Should 400 and return validation error messages if validation fails', async () => {
    const { sut, validatorStub } = sutFactory()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(Promise.resolve(new ValidationError(['Email inválido'])))
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: [{ message: 'Email inválido' }] })
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

  test('Should call LoginUsecase with correct values', async () => {
    const { sut, loginUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(loginUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith({ email: req.body.email, password: req.body.password })
  })

  test('Should 400 if LoginUsecaseStub throws InvalidCredentialsError', async () => {
    const { sut, loginUsecaseStub } = sutFactory()
    jest.spyOn(loginUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new InvalidCredentialsError()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Credenciais inválidas' })
  })

  test('Should 500 and return server error message if LoginUsecaseStub throws', async () => {
    const { sut, loginUsecaseStub } = sutFactory()
    jest.spyOn(loginUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: serverErrorMessage })
  })
})
