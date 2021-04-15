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
})
