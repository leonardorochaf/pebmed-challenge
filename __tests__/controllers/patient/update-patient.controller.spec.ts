/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import faker from 'faker'

import { UpdatePatientController } from '../../../src/controllers/patient/update-patient.controller'
import { ValidationError } from '../../../src/errors/validation-error'
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

class ValidatorStub implements IValidator {
  async validate (data: any, validationModel: any, skipMissingProperties: boolean): Promise<ValidationError> {
    return null
  }
}

type SutTypes = {
  sut: UpdatePatientController
  validatorStub: ValidatorStub
}

const sutFactory = (): SutTypes => {
  const validatorStub = new ValidatorStub()
  const sut = new UpdatePatientController(validatorStub)
  return {
    sut,
    validatorStub
  }
}

describe('Update Patient Controller', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = sutFactory()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(req, res)
    expect(validateSpy).toHaveBeenCalledWith(req.body, UpdatePatientValidationModel, true)
  })
})
