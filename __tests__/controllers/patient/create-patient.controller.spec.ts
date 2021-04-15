/* eslint-disable @typescript-eslint/consistent-type-assertions */
import faker from 'faker'
import { Request, Response } from 'express'

import { IValidator } from '../../../src/validation/interfaces/validator.interface'
import { ValidationError } from '../../../src/errors/validation-error'
import { CreatePatientValidationModel } from '../../../src/validation/validation-models/patient/create-patient-validation.model'
import { CreatePatientController } from '../../../src/controllers/patient/create-patient.controller'
import { Gender } from '../../../src/utils/gender-enum'
import { serverErrorMessage } from '../../../src/utils/strings'
import { CreatePatientParams, ICreatePatientUsecase } from '../../../src/usecases/patient/interface/create-patient.usecase.interface'
import { DefaultPatientResponse } from '../../../src/dtos/patient/default-patient-response'
import { EmailAlreadyInUseError } from '../../../src/errors/email-already-in-use-error'

const req: Request = {
  body: {
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    birthday: faker.date.past(),
    gender: Gender.MASCULINO,
    height: faker.datatype.float({ min: 0, max: 2.5 }),
    weight: faker.datatype.float({ min: 0, max: 100 })
  }
} as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

const mockCreatePatientUsecaseResponse = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  birthday: faker.date.past(),
  gender: Gender.MASCULINO,
  height: faker.datatype.float({ min: 0, max: 2.5 }),
  weight: faker.datatype.float({ min: 0, max: 100 })
}

class ValidatorStub implements IValidator {
  async validate (data: any, validationModel: any, skipMissingProperties: boolean): Promise<ValidationError> {
    return null
  }
}

class CreatePatientUsecaseStub implements ICreatePatientUsecase {
  async execute (params: CreatePatientParams): Promise<DefaultPatientResponse> {
    return mockCreatePatientUsecaseResponse
  }
}

type SutTypes = {
  sut: CreatePatientController
  validatorStub: ValidatorStub
  createPatientUsecaseStub: CreatePatientUsecaseStub
}

const sutFactory = (): SutTypes => {
  const createPatientUsecaseStub = new CreatePatientUsecaseStub()
  const validatorStub = new ValidatorStub()
  const sut = new CreatePatientController(validatorStub, createPatientUsecaseStub)
  return {
    sut,
    validatorStub,
    createPatientUsecaseStub
  }
}

describe('Create Patient Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, CreatePatientValidationModel, false)
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

  test('Should call CreatePatientUsecase with correct values', async () => {
    const { sut, createPatientUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(createPatientUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(req.body)
  })

  test('Should 400 and return default message if CreatePatientUsecase throw EmailAlreadyInUseError', async () => {
    const { sut, createPatientUsecaseStub } = sutFactory()
    jest.spyOn(createPatientUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new EmailAlreadyInUseError()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Esse email já está em uso' })
  })

  test('Should 500 and return server error message if CreatePatientUsecase throws', async () => {
    const { sut, createPatientUsecaseStub } = sutFactory()
    jest.spyOn(createPatientUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: serverErrorMessage })
  })
})
