import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Patient } from '../../models/Patient'
import { ISavePatientRepository, SavePatientData } from './interfaces/save-patient.repository.interface'
import { IGetPatientByEmailRepository } from './interfaces/get-patient-by-email.repository.interface'
import { IGetAllPatientsRepository } from './interfaces/get-all-patients.repository.interface'

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> implements ISavePatientRepository, IGetPatientByEmailRepository, IGetAllPatientsRepository {
  async createAndSave (params: SavePatientData): Promise<Patient> {
    const createPatient = this.create(params)
    createPatient.id = uuid()
    return await this.save(createPatient)
  }

  async getByEmail (email: string): Promise<Patient> {
    return await this.findOne({ email })
  }

  async getAll (): Promise<Patient[]> {
    return await this.find()
  }
}
