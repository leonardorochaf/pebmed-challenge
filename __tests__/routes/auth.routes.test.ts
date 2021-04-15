import request from 'supertest'
import { getConnection } from 'typeorm'
import bcrypt from 'bcrypt'

import app from '../../src/app'
import connectionHelper from '../../src/database/connection-helper'
import { Doctor } from '../../src/models/Doctor'
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

    test('Should 400 if validation fails', async () => {
      await request(app)
        .post(`${apiPath}/auth/signup`)
        .send({})
        .expect(400).then((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })

    test('Should 400 if email already in use', async () => {
      const repository = getConnection(process.env.NODE_ENV).getRepository(Doctor)
      await repository.save({
        id: '1',
        name: 'Leonardo Rocha',
        email: 'leonardo.rocha@gmail.com',
        password: 'hashed_password'
      })
      await request(app)
        .post(`${apiPath}/auth/signup`)
        .send({
          name: 'Leonardo Rocha',
          email: 'leonardo.rocha@gmail.com',
          password: '1235678'
        })
        .expect(400).then((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })
  })

  describe('POST /auth/login', () => {
    test('Should 200 on success', async () => {
      const hashedPassword = await bcrypt.hash('12345678', 12)
      const doctorRepository = getConnection(process.env.NODE_ENV).getRepository(Doctor)
      await doctorRepository.save({
        id: '1',
        name: 'Leonardo Rocha',
        email: 'leonardo.rocha@gmail.com',
        password: hashedPassword
      })
      await request(app)
        .post(`${apiPath}/auth/login`)
        .send({
          email: 'leonardo.rocha@gmail.com',
          password: '12345678'
        })
        .expect(200).then((res) => {
          expect(res.body).toHaveProperty('token')
        })
    })
  })
})
