import { LoginResponse } from '../../dtos/auth/login-response'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { IGetDoctorByEmailRepository } from '../../repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { ILoginUsecase, LoginUsecaseParams } from './interfaces/login.usecase.interface'

export class LoginUsecase implements ILoginUsecase {
  constructor (
    private readonly getDoctorByEmailRepository: IGetDoctorByEmailRepository
  ) { }

  async execute (params: LoginUsecaseParams): Promise<LoginResponse> {
    const doctorByEmail = await this.getDoctorByEmailRepository.getByEmail(params.email)
    if (!doctorByEmail) {
      throw new InvalidCredentialsError()
    }

    return Promise.resolve(null)
  }
}
