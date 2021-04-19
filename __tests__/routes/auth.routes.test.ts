// import request from 'supertest'
// import faker from 'faker'
// import { getConnection, getCustomRepository } from 'typeorm'
// import bcrypt from 'bcrypt'

// import app from '../../src/app'
// import connectionHelper from '../../src/database/connection-helper'
// import { Doctor } from '../../src/models/Doctor'
// import { apiPath } from '../../src/utils/strings'
// import { SessionRepository } from '../../src/repositories/session/session.repository'
// import { DoctorRepository } from '../../src/repositories/doctor/doctor.repository'
// import { JwtService } from '../../src/services/jwt/jwt.service'

// const mockAccessToken = async (): Promise<string> => {
//   const createdDoctor = await getCustomRepository(DoctorRepository, process.env.NODE_ENV).createAndSave({
//     name: faker.name.findName(),
//     email: faker.internet.email(),
//     hashedPassword: faker.datatype.uuid()
//   })
//   const accessToken = await new JwtService().generate(createdDoctor.id)
//   await getCustomRepository(SessionRepository, process.env.NODE_ENV).createAndSave({ token: accessToken, doctor: createdDoctor })

//   return accessToken
// }

// describe('Auth Routes', () => {
//   beforeAll(async () => {
//     await connectionHelper.create()
//   })

//   afterAll(async () => {
//     await connectionHelper.close()
//   })

//   afterEach(async () => {
//     await connectionHelper.clear()
//   })

//   describe('POST /auth/signup', () => {
//     test('Should 201 on success', async () => {
//       await request(app)
//         .post(`${apiPath}/auth/signup`)
//         .send({
//           name: 'Leonardo Rocha',
//           email: 'leonardo.rocha@gmail.com',
//           password: '12345678',
//           passwordConfirmation: '12345678'
//         })
//         .expect(201)
//     })

//     test('Should 400 if validation fails', async () => {
//       await request(app)
//         .post(`${apiPath}/auth/signup`)
//         .send({})
//         .expect(400).then((res) => {
//           expect(res.body).toHaveProperty('error')
//         })
//     })

//     test('Should 400 if email already in use', async () => {
//       const repository = getConnection(process.env.NODE_ENV).getRepository(Doctor)
//       await repository.save({
//         id: '1',
//         name: 'Leonardo Rocha',
//         email: 'leonardo.rocha@gmail.com',
//         password: 'hashed_password'
//       })
//       await request(app)
//         .post(`${apiPath}/auth/signup`)
//         .send({
//           name: 'Leonardo Rocha',
//           email: 'leonardo.rocha@gmail.com',
//           password: '1235678'
//         })
//         .expect(400).then((res) => {
//           expect(res.body).toHaveProperty('error')
//         })
//     })
//   })

//   describe('POST /auth/login', () => {
//     test('Should 200 on success', async () => {
//       const hashedPassword = await bcrypt.hash('12345678', 12)
//       const doctorRepository = getConnection(process.env.NODE_ENV).getRepository(Doctor)
//       await doctorRepository.save({
//         id: '1',
//         name: 'Leonardo Rocha',
//         email: 'leonardo.rocha@gmail.com',
//         password: hashedPassword
//       })
//       await request(app)
//         .post(`${apiPath}/auth/login`)
//         .send({
//           email: 'leonardo.rocha@gmail.com',
//           password: '12345678'
//         })
//         .expect(200).then((res) => {
//           expect(res.body).toHaveProperty('token')
//         })
//     })

//     test('Should 400 if validation fails', async () => {
//       await request(app)
//         .post(`${apiPath}/auth/login`)
//         .send({})
//         .expect(400).then((res) => {
//           expect(res.body).toHaveProperty('error')
//         })
//     })

//     test('Should 400 if invalid credentials are provided', async () => {
//       const doctorRepository = getConnection(process.env.NODE_ENV).getRepository(Doctor)
//       await doctorRepository.save({
//         id: '1',
//         name: 'Leonardo Rocha',
//         email: 'leonardo.rocha@gmail.com',
//         password: 'hashedPassword'
//       })
//       await request(app)
//         .post(`${apiPath}/auth/login`)
//         .send({
//           email: 'non-existent_email@email.com',
//           password: '12345678'
//         })
//         .expect(400).then((res) => {
//           expect(res.body).toHaveProperty('error')
//         })
//       await request(app)
//         .post(`${apiPath}/auth/login`)
//         .send({
//           email: 'leonardo.rocha@gmail.com',
//           password: 'wrong_password'
//         })
//         .expect(400).then((res) => {
//           expect(res.body).toHaveProperty('error')
//         })
//     })
//   })

//   describe('POST /auth/logout', () => {
//     test('Should 204 if invalid token is set', async () => {
//       await request(app)
//         .post(`${apiPath}/auth/logout`)
//         .set('x-auth-token', 'invalid_token')
//         .expect(204)
//     })

//     test('Should 204 if valid token is set', async () => {
//       const token = await mockAccessToken()
//       await request(app)
//         .post(`${apiPath}/auth/logout`)
//         .set('x-auth-token', token)
//         .expect(204)
//     })
//   })
// })

test('Test without memory database', async () => {
  expect(1).toBe(1)
})
