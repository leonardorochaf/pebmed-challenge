export interface ISignUpUsecase {
  execute: (params: SignUpParams) => Promise<void>
}

export type SignUpParams = {
  name: string
  email: string
  password: string
}
