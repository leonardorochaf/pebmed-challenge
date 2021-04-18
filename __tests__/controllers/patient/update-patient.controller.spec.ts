/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { UpdatePatientController } from '../../../src/controllers/patient/update-patient.controller'
import { DefaultPatientResponse } from '../../../src/dtos/patient/default-patient-response'
import { EmailAlreadyInUseError } from '../../../src/errors/email-already-in-use-error'
import { ValidationError } from '../../../src/errors/validation-error'
import { IUpdatePatientUsecase, UpdatePatientParams } from '../../../src/usecases/patient/interface/update-patient.usecase.interface'
import { Gender } from '../../../src/utils/gender-enum'
import { serverErrorMessage } from '../../../src/utils/strings'
import { IValidator } from '../../../src/validation/interfaces/validator.interface'
import { UpdatePatientValidationModel } from '../../../src/validation/validation-models/patient/update-patient-validation.model'

const req: Request = {
  params: {
    id: faker.datatype.uuid()
  },
  body: {
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    birthday: faker.date.past(),
    gender: faker.random.word(),
    height: faker.datatype.float({ min: 0, max: 2.5 }),
    weight: faker.datatype.float({ min: 0, max: 100 })
  }
} as unknown as Request

const res: Response = {} as Response
res.status = jest.fn().mockReturnValue(res)
res.json = jest.fn().mockReturnValue(res)

const mockUpdatePatientUsecaseResponse = {
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

class UpdatePatientUsecaseStub implements IUpdatePatientUsecase {
  async execute (patientId: string, params: UpdatePatientParams): Promise<DefaultPatientResponse> {
    return mockUpdatePatientUsecaseResponse
  }
}

type SutTypes = {
  sut: UpdatePatientController
  validatorStub: ValidatorStub
  updatePatientUsecaseStub: UpdatePatientUsecaseStub
}

const sutFactory = (): SutTypes => {
  const updatePatientUsecaseStub = new UpdatePatientUsecaseStub()
  const validatorStub = new ValidatorStub()
  const sut = new UpdatePatientController(validatorStub, updatePatientUsecaseStub)
  return {
    sut,
    validatorStub,
    updatePatientUsecaseStub
  }
}

describe('Update Patient Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, UpdatePatientValidationModel, true)
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

  test('Should call UpdatePatientUsecase with correct values', async () => {
    const { sut, updatePatientUsecaseStub } = sutFactory()
    const executeSpy = jest.spyOn(updatePatientUsecaseStub, 'execute')
    await sut.handle(req, res)
    expect(executeSpy).toHaveBeenCalledWith(req.params.id, req.body)
  })

  test('Should 400 and return default message if UpdatePatientUsecase throw EmailAlreadyInUseError', async () => {
    const { sut, updatePatientUsecaseStub } = sutFactory()
    jest.spyOn(updatePatientUsecaseStub, 'execute').mockImplementationOnce(() => {
      throw new EmailAlreadyInUseError()
    })
    await sut.handle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Esse email já está em uso' })
  })
})
