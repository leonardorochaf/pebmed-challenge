import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class RegisterScheduleValidatonModel {
  @IsDateString({ strict: true }, { message: 'Data inválida' })
  @IsNotEmpty({ message: 'Data do agendamento é obrigatória' })
  time: Date

  @IsNotEmpty({ message: 'Paciente é obrigatório' })
  @IsString({ message: 'Paciente inválido' })
  patientId: string
}
