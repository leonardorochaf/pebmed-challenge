import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { ValidationError } from '../../src/errors/validation-error'
import { IValidator } from '../../src/validation/interfaces/validator.interface'

export class Validator implements IValidator {
  async validate (data: any, validatorModel: any, skipMissingProperties: boolean): Promise<ValidationError> {
    const errors = await validate(plainToClass(validatorModel, data), { skipMissingProperties: skipMissingProperties })
    if (errors.length === 0) {
      return null
    }
  }
}
