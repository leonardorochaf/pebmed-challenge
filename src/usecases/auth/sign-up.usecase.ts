import { EmailAlreadyInUseError } from '../../errors/email-already-in-use-error'
import { IGetDoctorByEmailRepository } from '../../repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { SignUpParams } from './interfaces/sign-up.usecase.interface'

export class SignUpUsecase {
  constructor (
    private readonly getDoctorByEmailRepository: IGetDoctorByEmailRepository
  ) { }

  async execute (params: SignUpParams): Promise<void> {
    const doctorByEmail = await this.getDoctorByEmailRepository.getByEmail(params.email)
    if (doctorByEmail) {
      throw new EmailAlreadyInUseError()
    }
  }
}
