import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAppointmentValidationModel {
  @IsString({ message: 'Observação inválida' })
  @IsNotEmpty({ message: 'Observação é obrigatória' })
  observation: string

  @IsNotEmpty({ message: 'Agendamento é obrigatório' })
  @IsString({ message: 'Agendamento inválido' })
  scheduleId: string
}
