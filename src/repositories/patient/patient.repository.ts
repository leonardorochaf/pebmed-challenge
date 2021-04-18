import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Patient } from '../../models/Patient'
import { ISavePatientRepository, SavePatientData } from './interfaces/save-patient.repository.interface'
import { IGetPatientByEmailRepository } from './interfaces/get-patient-by-email.repository.interface'
import { IGetAllPatientsRepository } from './interfaces/get-all-patients.repository.interface'
import { IGetPatientByIdRepository } from './interfaces/get-patient-by-id.repository.interface'
import { IDeletePatientRepository } from './interfaces/delete-patient.repository.interface'
import { UpdatePatientRepositoryParams } from './interfaces/update-patient.repository.interface'

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> implements
  ISavePatientRepository,
  IGetPatientByEmailRepository,
  IGetAllPatientsRepository,
  IGetPatientByIdRepository,
  IDeletePatientRepository {
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

  async getById (patientId: string): Promise<Patient> {
    return await this.findOne({ id: patientId })
  }

  async logicalDelete (patientId: string): Promise<void> {
    await this.update({ id: patientId }, { name: null, phone: null, email: null, birthday: null, gender: null, height: null, weight: null })
    await this.softDelete(patientId)
  }

  async updateAndReload (patientId: string, params: UpdatePatientRepositoryParams): Promise<Patient> {
    const updatedPatient = this.create(params)
    updatedPatient.id = patientId
    await this.save(updatedPatient)
    return await this.findOne({ id: patientId })
  }
}
