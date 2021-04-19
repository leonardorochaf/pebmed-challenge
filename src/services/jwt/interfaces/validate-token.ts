export interface IValidateToken {
  validate: (token: string) => Promise<boolean>
}
