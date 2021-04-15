import { LoginResponse } from '../../../dtos/auth/login-response'

export interface ILoginUsecase {
  execute: (params: LoginUsecaseParams) => Promise<LoginResponse>
}

export type LoginUsecaseParams = {
  email: string
  password: string
}
