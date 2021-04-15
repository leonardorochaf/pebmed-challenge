import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Doctor } from '../../models/Doctor'
import { ISaveDoctorRepository, SaveDoctorData } from './interfaces/save-doctor.repository.interface'
import { IGetDoctorByEmailRepository } from './interfaces/get-doctor-by-email.repository.interface'

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> implements ISaveDoctorRepository, IGetDoctorByEmailRepository {
  async createAndSave (data: SaveDoctorData): Promise<Doctor> {
    const createdDoctor = this.create({ name: data.name, email: data.email, password: data.hashedPassword })
    createdDoctor.id = uuid()
    return await this.save(createdDoctor)
  }

  async getByEmail (email: string): Promise<Doctor> {
    return await this.findOne({ email })
  }
}
