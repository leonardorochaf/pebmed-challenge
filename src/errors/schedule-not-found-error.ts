export class ScheduleNotFoundError extends Error {
  constructor () {
    super('Agendamento não encontrado')
  }
}
