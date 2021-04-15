import { IGetDoctorByEmailRepository } from '../../repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { SignUpParams } from './interfaces/sign-up.usecase.interface'

export class SignUpUsecase {
  constructor (
    private readonly getDoctorByEmailRepository: IGetDoctorByEmailRepository
  ) { }

  async execute (params: SignUpParams): Promise<void> {
    await this.getDoctorByEmailRepository.getByEmail(params.email)
  }
}
