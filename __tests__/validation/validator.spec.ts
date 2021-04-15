import * as classValidator from 'class-validator'
import { ValidationError } from '../../src/errors/validation-error'

import { SignUpValidationModel } from '../../src/validation/validation-models/auth/sign-up.validation.model'
import { Validator } from '../../src/validation/validator'

const mockedData = {}

type SutTypes = {
  sut: Validator
}

const makeSut = (): SutTypes => {
  const sut = new Validator()
  return {
    sut
  }
}

describe('Validator', () => {
  test('Should return null if ClassValidator dont return an error', async () => {
    const { sut } = makeSut()
    jest.spyOn(classValidator, 'validate').mockReturnValueOnce(Promise.resolve([]))
    const response = await sut.validate(mockedData, SignUpValidationModel, false)
    expect(response).toBeFalsy()
  })

  test('Should return a ValidationError if ClassValidator return an error', async () => {
    const { sut } = makeSut()
    jest.spyOn(classValidator, 'validate').mockReturnValueOnce(Promise.resolve([{
      property: 'any_property'
    }]))
    const response = await sut.validate(mockedData, SignUpValidationModel, false)
    expect(response).toEqual(new ValidationError([]))
  })
})
