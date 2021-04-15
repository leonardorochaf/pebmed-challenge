import faker from 'faker'
import moment from 'moment'
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

  test('Should search for a patient by its email and return it if it finds one', async () => {
    const sut = getCustomRepository(PatientRepository, process.env.NODE_ENV)
    await sut.createAndSave(saveRequest)
    const patientByEmail = await sut.getByEmail(saveRequest.email)
    expect(patientByEmail).toBeTruthy()
    expect(patientByEmail.id).toBeTruthy()
    expect(patientByEmail.name).toBe(saveRequest.name)
    expect(patientByEmail.phone).toBe(saveRequest.phone)
    expect(patientByEmail.email).toBe(saveRequest.email)
    expect(patientByEmail.birthday).toStrictEqual(moment(saveRequest.birthday).format('YYYY-MM-DD'))
    expect(patientByEmail.gender).toBe(saveRequest.gender)
    expect(patientByEmail.height).toBe(saveRequest.height)
    expect(patientByEmail.weight).toBe(saveRequest.weight)
    expect(patientByEmail.createdAt).toBeTruthy()
    expect(patientByEmail.updatedAt).toBeTruthy()
  })

  test('Should return null if theres no patient with given email', async () => {
    const sut = getCustomRepository(PatientRepository, process.env.NODE_ENV)
    const patientByEmail = await sut.getByEmail('invalid_email')
    expect(patientByEmail).toBeFalsy()
  })

  test('Should get all patients on the database', async () => {
    const sut = getCustomRepository(PatientRepository, process.env.NODE_ENV)
    await sut.createAndSave(saveRequest)
    const allPatients = await sut.getAll()
    expect(allPatients).toBeTruthy()
    expect(allPatients).toHaveLength(1)
    expect(allPatients[0].id).toBeTruthy()
    expect(allPatients[0].name).toBe(saveRequest.name)
    expect(allPatients[0].phone).toBe(saveRequest.phone)
    expect(allPatients[0].email).toBe(saveRequest.email)
    expect(allPatients[0].birthday).toStrictEqual(moment(saveRequest.birthday).format('YYYY-MM-DD'))
    expect(allPatients[0].gender).toBe(saveRequest.gender)
    expect(allPatients[0].height).toBe(saveRequest.height)
    expect(allPatients[0].weight).toBe(saveRequest.weight)
    expect(allPatients[0].createdAt).toBeTruthy()
    expect(allPatients[0].updatedAt).toBeTruthy()
  })

  test('Should return an empty array if theres no patients in the database', async () => {
    const sut = getCustomRepository(PatientRepository, process.env.NODE_ENV)
    const allPatients = await sut.getAll()
    expect(allPatients).toHaveLength(0)
    expect(allPatients).toEqual([])
  })
})
