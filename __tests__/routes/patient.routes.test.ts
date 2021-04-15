import request from 'supertest'

import app from '../../src/app'
import connectionHelper from '../../src/database/connection-helper'
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
  })
})
