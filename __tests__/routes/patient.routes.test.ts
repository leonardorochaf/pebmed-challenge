import request from 'supertest'
import { getConnection } from 'typeorm'

import app from '../../src/app'
import connectionHelper from '../../src/database/connection-helper'
import { Patient } from '../../src/models/Patient'
import { Gender } from '../../src/utils/gender-enum'
import { apiPath } from '../../src/utils/strings'

describe('Patient Routes', () => {
  beforeAll(async () => {
    await connectionHelper.create()
  })

  afterAll(async () => {
    await connectionHelper.close()
  })

  afterEach(async () => {
    await connectionHelper.clear()
  })

  describe('POST /patients', () => {
    test('Should 201 and return patient on success', async () => {
      await request(app)
        .post(`${apiPath}/patients`)
        .send({
          name: 'Leonardo Rocha',
          phone: '21 123456789',
          email: 'leonardo.rocha@gmail.com',
          birthday: '1995-03-08',
          gender: 'Masculino',
          height: 1.78,
          weight: 80
        })
        .expect(201).then((res) => {
          expect(res.body).toHaveProperty('id')
          expect(res.body.name).toBe('Leonardo Rocha')
          expect(res.body.phone).toBe('21 123456789')
          expect(res.body.email).toBe('leonardo.rocha@gmail.com')
          expect(res.body.birthday).toBe('1995-03-08')
          expect(res.body.gender).toBe('Masculino')
          expect(res.body.height).toBe(1.78)
          expect(res.body.weight).toBe(80)
        })
    })

    test('Should 400 if validation fails', async () => {
      await request(app)
        .post(`${apiPath}/patients`)
        .send({})
        .expect(400).then((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })

    test('Should 400 if email already in use', async () => {
      const repository = getConnection(process.env.NODE_ENV).getRepository(Patient)
      await repository.save({
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
        .post(`${apiPath}/patients`)
        .send({
          name: 'Leonardo Rocha',
          phone: '21 123456789',
          email: 'leonardo.rocha@gmail.com',
          birthday: '1995-03-08',
          gender: 'Masculino',
          height: 1.78,
          weight: 80
        })
        .expect(400).then((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })
  })

  describe('GET /patients', () => {
    test('Should 200 and return all patients on success', async () => {
      const repository = getConnection(process.env.NODE_ENV).getRepository(Patient)
      await repository.save({
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
        .get(`${apiPath}/patients`)
        .expect(200).then((res) => {
          expect(res.body).toHaveLength(1)
          expect(res.body[0].id).toBe('1')
          expect(res.body[0].name).toBe('Leonardo Rocha')
          expect(res.body[0].phone).toBe('21 123456789')
          expect(res.body[0].email).toBe('leonardo.rocha@gmail.com')
          expect(res.body[0].birthday).toBe('1995-03-08')
          expect(res.body[0].gender).toBe('Masculino')
          expect(res.body[0].height).toBe(1.78)
          expect(res.body[0].weight).toBe(80)
        })
    })
  })

  describe('GET /patients/:id', () => {
    test('Should 200 and return patient on success', async () => {
      const repository = getConnection(process.env.NODE_ENV).getRepository(Patient)
      await repository.save({
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
        .get(`${apiPath}/patients/1`)
        .expect(200).then((res) => {
          expect(res.body.id).toBe('1')
          expect(res.body.name).toBe('Leonardo Rocha')
          expect(res.body.phone).toBe('21 123456789')
          expect(res.body.email).toBe('leonardo.rocha@gmail.com')
          expect(res.body.birthday).toBe('1995-03-08')
          expect(res.body.gender).toBe('Masculino')
          expect(res.body.height).toBe(1.78)
          expect(res.body.weight).toBe(80)
        })
    })
  })
})
