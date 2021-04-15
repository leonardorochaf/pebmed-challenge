import faker from 'faker'
import { getCustomRepository } from 'typeorm'

import connectionHelper from '../../src/database/connection-helper'
import { PatientRepository } from '../../src/repositories/patient/patient.repository'
import { Gender } from '../../src/utils/gender-enum'

const saveRequest = {
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  birthday: faker.date.past(),
  gender: Gender.MASCULINO,
  height: faker.datatype.float({ min: 0, max: 2.5 }),
  weight: faker.datatype.float({ min: 0, max: 100 })
}

describe('Patient Repository', () => {
  beforeAll(async () => {
    await connectionHelper.create()
  })

  afterAll(async () => {
    await connectionHelper.close()
  })

  afterEach(async () => {
    await connectionHelper.clear()
  })

  test('Should create a patient and return it', async () => {
    const sut = getCustomRepository(PatientRepository, process.env.NODE_ENV)
    const createdPatient = await sut.createAndSave(saveRequest)
    expect(createdPatient).toBeTruthy()
    expect(createdPatient.id).toBeTruthy()
    expect(createdPatient.name).toBe(saveRequest.name)
    expect(createdPatient.phone).toBe(saveRequest.phone)
    expect(createdPatient.email).toBe(saveRequest.email)
    expect(createdPatient.birthday).toStrictEqual(new Date(saveRequest.birthday.setHours(0, 0, 0, 0)))
    expect(createdPatient.gender).toBe(saveRequest.gender)
    expect(createdPatient.height).toBe(saveRequest.height)
    expect(createdPatient.weight).toBe(saveRequest.weight)
    expect(createdPatient.createdAt).toBeTruthy()
    expect(createdPatient.updatedAt).toBeTruthy()
  })
})
