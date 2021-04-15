import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginValidationModel {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string

  @IsString({ message: 'Senha inválida' })
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string
}
