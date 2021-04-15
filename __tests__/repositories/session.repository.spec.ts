import faker from 'faker'
import { getCustomRepository } from 'typeorm'

import connectionHelper from '../../src/database/connection-helper'
import { DoctorRepository } from '../../src/repositories/doctor/doctor.repository'
import { SessionRepository } from '../../src/repositories/session/session.repository'

const saveRequest = {
  token: faker.datatype.uuid(),
  loginAt: faker.date.past(),
  doctor: null
}

describe('Session Repository', () => {
  beforeAll(async () => {
    await connectionHelper.create()
  })

  afterAll(async () => {
    await connectionHelper.close()
  })

  afterEach(async () => {
    await connectionHelper.clear()
  })

  test('Should create a session', async () => {
    const sut = getCustomRepository(SessionRepository, process.env.NODE_ENV)
    const doctorRepository = getCustomRepository(DoctorRepository, process.env.NODE_ENV)
    const createdDoctor = await doctorRepository.createAndSave({
      name: faker.name.findName(),
      email: faker.internet.email(),
      hashedPassword: faker.datatype.uuid()
    })
    saveRequest.doctor = createdDoctor
    await sut.createAndSave(saveRequest)
    const createdSession = await sut.find()
    expect(createdSession.length).toBe(1)
    expect(createdSession[0].id).toBeTruthy()
    expect(createdSession[0].token).toBe(saveRequest.token)
    expect(createdSession[0].loginAt).toBeTruthy()
    expect(createdSession[0].logoutAt).toBeFalsy()
    expect(createdSession[0].doctor.id).toBe(createdDoctor.id)
    expect(createdSession[0].doctor.name).toBe(createdDoctor.name)
    expect(createdSession[0].doctor.email).toBe(createdDoctor.email)
    expect(createdSession[0].doctor.password).toBe(createdDoctor.password)
  })

  test('Should find session by token and return it', async () => {
    const sut = getCustomRepository(SessionRepository, process.env.NODE_ENV)
    const doctorRepository = getCustomRepository(DoctorRepository, process.env.NODE_ENV)
    const createdDoctor = await doctorRepository.createAndSave({
      name: faker.name.findName(),
      email: faker.internet.email(),
      hashedPassword: faker.datatype.uuid()
    })
    saveRequest.doctor = createdDoctor
    await sut.createAndSave(saveRequest)
    const sessionByToken = await sut.getActiveByToken(saveRequest.token)
    expect(sessionByToken.id).toBeTruthy()
    expect(sessionByToken.token).toBe(saveRequest.token)
    expect(sessionByToken.loginAt).toBeTruthy()
    expect(sessionByToken.logoutAt).toBeFalsy()
    expect(sessionByToken.doctor.id).toBe(createdDoctor.id)
    expect(sessionByToken.doctor.name).toBe(createdDoctor.name)
    expect(sessionByToken.doctor.email).toBe(createdDoctor.email)
    expect(sessionByToken.doctor.password).toBe(createdDoctor.password)
  })
})
