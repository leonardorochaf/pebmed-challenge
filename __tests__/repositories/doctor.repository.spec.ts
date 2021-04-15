import faker from 'faker'
import { getCustomRepository } from 'typeorm'

import connectionHelper from '../../src/database/connection-helper'
import { DoctorRepository } from '../../src/repositories/doctor/doctor.repository'

const saveRequest = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  hashedPassword: faker.random.uuid()
}

describe('Doctor Repository', () => {
  beforeAll(async () => {
    await connectionHelper.create()
  })

  afterAll(async () => {
    await connectionHelper.close()
  })

  afterEach(async () => {
    await connectionHelper.clear()
  })

  test('Should create a doctor and return it', async () => {
    const sut = getCustomRepository(DoctorRepository, process.env.NODE_ENV)
    const createdDoctor = await sut.createAndSave(saveRequest)
    expect(createdDoctor).toBeTruthy()
    expect(createdDoctor.id).toBeTruthy()
    expect(createdDoctor.name).toBe(saveRequest.name)
    expect(createdDoctor.email).toBe(saveRequest.email)
    expect(createdDoctor.password).toBe(saveRequest.hashedPassword)
    expect(createdDoctor.createdAt).toBeTruthy()
  })

  test('Should search for a doctor by its email and return it if it finds one', async () => {
    const sut = getCustomRepository(DoctorRepository, process.env.NODE_ENV)
    await sut.createAndSave(saveRequest)
    const doctorByEmail = await sut.getByEmail(saveRequest.email)
    expect(doctorByEmail).toBeTruthy()
    expect(doctorByEmail.id).toBeTruthy()
    expect(doctorByEmail.name).toBe(saveRequest.name)
    expect(doctorByEmail.email).toBe(saveRequest.email)
    expect(doctorByEmail.password).toBe(saveRequest.hashedPassword)
    expect(doctorByEmail.createdAt).toBeTruthy()
  })
})
