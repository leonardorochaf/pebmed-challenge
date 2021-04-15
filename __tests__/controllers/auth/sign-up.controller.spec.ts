/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { SignUpController } from '../../../src/controllers/auth/sign-up.controller'
import { EmailAlreadyInUseError } from '../../../src/errors/email-already-in-use-error'
import { ValidationError } from '../../../src/errors/validation-error'
import { ISignUpUsecase, SignUpParams } from '../../../src/usecases/auth/interfaces/sign-up.usecase.interface'
import { serverErrorMessage } from '../../../src/utils/strings'
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

class SignUpUsecaseStub implements ISignUpUsecase {
  async execute (params: SignUpParams): Promise<void> { }
}

type SutTypes = {
  sut: SignUpController
  validatorStub: ValidatorStub
  createDoctorUsecaseStub: SignUpUsecaseStub
}

const sutFactory = (): SutTypes => {
  const createDoctorUsecaseStub = new SignUpUsecaseStub()
  const validatorStub = new ValidatorStub()
  const sut = new SignUpController(validatorStub, createDoctorUsecaseStub)
  return {
    sut,
    validatorStub,
    createDoctorUsecaseStub
  }
}

describe('Sign Up Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, SignUpValidationModel, false)
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

  test('Should call SignUpUsecase with correct values', async () => {
    const { sut, createDoctorUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(createDoctorUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
  })

  test('Should 400 and return default message if SignUpUsecase throw EmailAlreadyInUseError', async () => {
    const { sut, createDoctorUsecaseStub } = sutFactory()
    jest.spyOn(createDoctorUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new EmailAlreadyInUseError()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Esse email já está em uso' })
  })

  test('Should 500 and return server error message if SignUpUsecase throws', async () => {
    const { sut, createDoctorUsecaseStub } = sutFactory()
    jest.spyOn(createDoctorUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: serverErrorMessage })
  })
})
