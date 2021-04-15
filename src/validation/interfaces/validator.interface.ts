import { ValidationError } from '../../errors/validation-error'

export interface IValidator {
  validate: (data: any, validationModel: any, skipMissingProperties: boolean) => Promise<ValidationError>
}
