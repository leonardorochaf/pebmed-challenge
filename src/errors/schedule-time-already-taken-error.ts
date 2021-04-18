export class ScheduleTimeAlreadyTakenError extends Error {
  constructor () {
    super('Horário para agendamento já cadastrado')
  }
}
