export class PatientNotFoundError extends Error {
  constructor () {
    super('Paciente não encontrado')
  }
}
