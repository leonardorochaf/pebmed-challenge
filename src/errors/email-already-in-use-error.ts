export class EmailAlreadyInUseError extends Error {
  constructor () {
    super('Esse email já está em uso')
  }
}
