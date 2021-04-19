import { IsDateString, IsNotEmpty } from 'class-validator'

export class UpdateScheduleValidatonModel {
  @IsDateString({ strict: true }, { message: 'Data inválida' })
  @IsNotEmpty({ message: 'Data do agendamento é obrigatória' })
  time: Date
}
