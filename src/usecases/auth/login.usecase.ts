import { LoginResponse } from '../../dtos/auth/login-response'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { IGetDoctorByEmailRepository } from '../../repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { ISaveSessionRepository } from '../../repositories/session/interfaces/save-session.repository.interface'
import { IHasherComparer } from '../../services/cryptography/interfaces/hasher-comparer.interface'
import { IGenerateToken } from '../../services/jwt/interfaces/generate-token.interface'
import { ILoginUsecase, LoginUsecaseParams } from './interfaces/login.usecase.interface'

export class LoginUsecase implements ILoginUsecase {
  constructor (
    private readonly getDoctorByEmailRepository: IGetDoctorByEmailRepository,
    private readonly hasherComparer: IHasherComparer,
    private readonly generateToken: IGenerateToken,
    private readonly saveSessionRepository: ISaveSessionRepository
  ) { }

  async execute (params: LoginUsecaseParams): Promise<LoginResponse> {
    const doctorByEmail = await this.getDoctorByEmailRepository.getByEmail(params.email)
    if (!doctorByEmail) {
      throw new InvalidCredentialsError()
    }

    const isCorrectPassword = await this.hasherComparer.compare(params.password, doctorByEmail.password)
    if (!isCorrectPassword) {
      throw new InvalidCredentialsError()
    }

    const token = await this.generateToken.generate(doctorByEmail.id)

    await this.saveSessionRepository.createAndSave({ token, doctor: doctorByEmail })

    return { token }
  }
}
