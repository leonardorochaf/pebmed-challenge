import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { IsEqualTo } from '../../custom-validation-decorators/is-equal-to.decorator'

export class SignUpValidationModel {
  @IsString({ message: 'Nome inválido' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string

  @IsString({ message: 'Senha inválida' })
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string

  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  @IsEqualTo('password', { message: 'Confirmação de senha deve ser igual a senha' })
  passwordConfirmation: string
}
