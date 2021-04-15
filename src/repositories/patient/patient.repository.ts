import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Patient } from '../../models/Patient'
import { ISavePatientRepository, SavePatientData } from './interfaces/save-patient.repository.interface'

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> implements ISavePatientRepository {
  async createAndSave (params: SavePatientData): Promise<Patient> {
    const createPatient = this.create(params)
    createPatient.id = uuid()
    return await this.save(createPatient)
  }
}
