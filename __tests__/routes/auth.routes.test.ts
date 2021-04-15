import request from 'supertest'

import app from '../../src/app'
import connectionHelper from '../../src/database/connection-helper'
import { apiPath } from '../../src/utils/strings'

describe('Auth Routes', () => {
  beforeAll(async () => {
    await connectionHelper.create()
  })

  afterAll(async () => {
    await connectionHelper.close()
  })

  afterEach(async () => {
    await connectionHelper.clear()
  })

  describe('POST /auth/signup', () => {
    test('Should 201 on success', async () => {
      await request(app)
        .post(`${apiPath}/auth/signup`)
        .send({
          name: 'Leonardo Rocha',
          email: 'leonardo.rocha@gmail.com',
          password: '12345678',
          passwordConfirmation: '12345678'
        })
        .expect(201)
    })
  })
})
