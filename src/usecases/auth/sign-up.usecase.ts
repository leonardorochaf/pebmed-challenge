import { EmailAlreadyInUseError } from '../../errors/email-already-in-use-error'
import { IGetDoctorByEmailRepository } from '../../repositories/doctor/interfaces/get-doctor-by-email.repository.interface'
import { ISaveDoctorRepository } from '../../repositories/doctor/interfaces/save-doctor.repository.interface'
import { IHasher } from '../../services/cryptography/interfaces/hasher.interface'
import { SignUpParams } from './interfaces/sign-up.usecase.interface'

export class SignUpUsecase {
  constructor (
    private readonly getDoctorByEmailRepository: IGetDoctorByEmailRepository,
    private readonly hasher: IHasher,
    private readonly saveDoctorRepository: ISaveDoctorRepository
  ) { }

  async execute (params: SignUpParams): Promise<void> {
    const doctorByEmail = await this.getDoctorByEmailRepository.getByEmail(params.email)
    if (doctorByEmail) {
      throw new EmailAlreadyInUseError()
    }

    const hashedPassword = await this.hasher.hash(params.password)

    await this.saveDoctorRepository.createAndSave({ name: params.name, email: params.email, hashedPassword })
  }
}
