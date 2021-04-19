/* eslint-disable @typescript-eslint/consistent-type-assertions */
import faker from 'faker'
import { Request, Response } from 'express'

import { IValidator } from '../../../src/validation/interfaces/validator.interface'
import { ValidationError } from '../../../src/errors/validation-error'
import { CreateAppointmentValidationModel } from '../../../src/validation/validation-models/appointment/create-appointment-validation.model'
import { CreateAppointmentController } from '../../../src/controllers/appointment/create-appointment.controller'

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

type SutTypes = {
  sut: CreateAppointmentController
  validatorStub: ValidatorStub
}

const sutFactory = (): SutTypes => {
  const validatorStub = new ValidatorStub()
  const sut = new CreateAppointmentController(validatorStub)
  return {
    sut,
    validatorStub
  }
}

describe('Create Appointment Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, CreateAppointmentValidationModel, false)
  })
})
