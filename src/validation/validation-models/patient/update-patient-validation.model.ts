import { IsDateString, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator'
import { Gender } from '../../../utils/gender-enum'

export class UpdatePatientValidationModel {
  @IsString({ message: 'Nome inválido' })
  name: string

  @IsEmail({}, { message: 'Email inválido' })
  email: string

  @IsString({ message: 'Telefone inválido' })
  phone: string

  @IsDateString({}, { message: 'Data de nascimento inválida' })
  birthday: Date

  @IsEnum(Gender, { message: 'Sexo inválido' })
  gender: string

  @IsNumber({}, { message: 'Altura no formato inválido' })
  height: number

  @IsNumber({}, { message: 'Peso no formato inválido' })
  weight: number
}
