/* eslint-disable @typescript-eslint/restrict-template-expressions */
import request from 'supertest'
import { getConnection } from 'typeorm'

import app from '../../src/app'
import connectionHelper from '../../src/database/connection-helper'
import { Patient } from '../../src/models/Patient'
import { Gender } from '../../src/utils/gender-enum'
import { apiPath } from '../../src/utils/strings'

async function createDoctorAndGetAuthToken (): Promise<string> {
  await request(app)
    .post(`${apiPath}/auth/signup`)
    .set({ Accept: 'application/json' })
    .send({
      name: 'Doutor Leonardo Rocha',
      email: 'doutor.leonardo.rocha@gmail.com',
      password: '12345678',
      passwordConfirmation: '12345678'
    })

  const resp = await request(app)
    .post(`${apiPath}/auth/login`)
    .send({
      email: 'doutor.leonardo.rocha@gmail.com',
      password: '12345678'
    })

  return resp.body.token
}

describe('Schedule routes', () => {
  beforeAll(async () => {
    await connectionHelper.create()
  })

  afterAll(async () => {
    await connectionHelper.close()
  })

  afterEach(async () => {
    await connectionHelper.clear()
  })

  describe('POST /schedules', () => {
    test('Should 201 and return schedule on success', async () => {
      const token = await createDoctorAndGetAuthToken()
      const patientRepository = getConnection(process.env.NODE_ENV).getRepository(Patient)
      await patientRepository.save({
        id: '1',
        name: 'Leonardo Rocha',
        phone: '21 123456789',
        email: 'leonardo.rocha@gmail.com',
        birthday: '1995-03-08',
        gender: Gender.MASCULINO,
        height: 1.78,
        weight: 80
      })
      await request(app)
        .post(`${apiPath}/schedules`)
        .set('x-auth-token', token)
        .send({
          time: '2021-04-18 21:11:00',
          patientId: '1'
        })
        .expect(201).then((res) => {
          expect(res.body).toHaveProperty('id')
          expect(res.body.time).toBeTruthy()
          expect(res.body.patient.name).toBe('Leonardo Rocha')
          expect(res.body.patient.phone).toBe('21 123456789')
          expect(res.body.patient.email).toBe('leonardo.rocha@gmail.com')
          expect(res.body.patient.birthday).toBe('1995-03-08')
          expect(res.body.patient.gender).toBe('Masculino')
          expect(res.body.patient.height).toBe(1.78)
          expect(res.body.patient.weight).toBe(80)
        })
    })
  })

  describe('PUT /schedules/:id', () => {
    test('Should 200 and return updated schedule on success', async () => {
      const token = await createDoctorAndGetAuthToken()
      const patientRepository = getConnection(process.env.NODE_ENV).getRepository(Patient)
      await patientRepository.save({
        id: '1',
        name: 'Leonardo Rocha',
        phone: '21 123456789',
        email: 'leonardo.rocha@gmail.com',
        birthday: '1995-03-08',
        gender: Gender.MASCULINO,
        height: 1.78,
        weight: 80
      })
      const response = await request(app)
        .post(`${apiPath}/schedules`)
        .set('x-auth-token', token)
        .send({
          time: '2021-04-18 21:11:00',
          patientId: '1'
        })
      await request(app)
        .put(`${apiPath}/schedules/${response.body.id}`)
        .send({
          time: '2021-04-19 10:00:00'
        })
        .expect(200).then((res) => {
          expect(res.body).toHaveProperty('id')
          expect(res.body.time).toBe('2021-04-19T13:00:00.000Z')
          expect(res.body.patient).toBeTruthy()
        })
    })
  })

  describe('DELETE /schedules/:id', () => {
    test('Should 204 on success', async () => {
      const token = await createDoctorAndGetAuthToken()
      const patientRepository = getConnection(process.env.NODE_ENV).getRepository(Patient)
      await patientRepository.save({
        id: '1',
        name: 'Leonardo Rocha',
        phone: '21 123456789',
        email: 'leonardo.rocha@gmail.com',
        birthday: '1995-03-08',
        gender: Gender.MASCULINO,
        height: 1.78,
        weight: 80
      })
      const response = await request(app)
        .post(`${apiPath}/schedules`)
        .set('x-auth-token', token)
        .send({
          time: '2021-04-18 21:11:00',
          patientId: '1'
        })
      await request(app)
        .delete(`${apiPath}/schedules/${response.body.id}`)
        .expect(204).then((res) => {
          expect(res.body).toStrictEqual({})
        })
    })
  })
})
