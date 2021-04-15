export class ValidationError extends Error {
  errors: Array<{
    message: string
  }> = []

  constructor (private readonly errorsMessages: string[]) {
    super()
    errorsMessages.forEach(m => {
      this.errors.push({ message: m })
    })
  }
}
