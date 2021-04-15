import { LoginResponse } from '../../dtos/auth/login-response'
import { IGetDoctorByEmailRepository } from '../../repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { ILoginUsecase, LoginUsecaseParams } from './interfaces/login.usecase.interface'

export class LoginUsecase implements ILoginUsecase {
  constructor (
    private readonly getDoctorByEmailRepository: IGetDoctorByEmailRepository
  ) { }

  async execute (params: LoginUsecaseParams): Promise<LoginResponse> {
    await this.getDoctorByEmailRepository.getByEmail(params.email)

    return Promise.resolve(null)
  }
}
