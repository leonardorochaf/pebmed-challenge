// import request from 'supertest'
// import { getConnection } from 'typeorm'

// import app from '../../src/app'
// import connectionHelper from '../../src/database/connection-helper'
// import { Patient } from '../../src/models/Patient'
// import { Gender } from '../../src/utils/gender-enum'
// import { apiPath } from '../../src/utils/strings'

// async function createDoctorAndGetAuthToken (): Promise<string> {
//   await request(app)
//     .post(`${apiPath}/auth/signup`)
//     .set({ Accept: 'application/json' })
//     .send({
//       name: 'Doutor Leonardo Rocha',
//       email: 'doutor.leonardo.rocha@gmail.com',
//       password: '12345678',
//       passwordConfirmation: '12345678'
//     })

//   const resp = await request(app)
//     .post(`${apiPath}/auth/login`)
//     .send({
//       email: 'doutor.leonardo.rocha@gmail.com',
//       password: '12345678'
//     })

//   return resp.body.token
// }

// describe('Patient Routes', () => {
//   beforeAll(async () => {
//     await connectionHelper.create()
//   })

//   afterAll(async () => {
//     await connectionHelper.close()
//   })

//   afterEach(async () => {
//     await connectionHelper.clear()
//   })

//   describe('POST /patients', () => {
//     test('Should 201 and return patient on success', async () => {
//       const token = await createDoctorAndGetAuthToken()
//       await request(app)
//         .post(`${apiPath}/patients`)
//         .set('x-auth-token', token)
//         .send({
//           name: 'Leonardo Rocha',
//           phone: '21 123456789',
//           email: 'leonardo.rocha@gmail.com',
//           birthday: '1995-03-08',
//           gender: 'Masculino',
//           height: 1.78,
//           weight: 80
//         })
//         .expect(201).then((res) => {
//           expect(res.body).toHaveProperty('id')
//           expect(res.body.name).toBe('Leonardo Rocha')
//           expect(res.body.phone).toBe('21 123456789')
//           expect(res.body.email).toBe('leonardo.rocha@gmail.com')
//           expect(res.body.birthday).toBe('1995-03-08')
//           expect(res.body.gender).toBe('Masculino')
//           expect(res.body.height).toBe(1.78)
//           expect(res.body.weight).toBe(80)
//         })
//     })

//     test('Should 400 if validation fails', async () => {
//       const token = await createDoctorAndGetAuthToken()
//       await request(app)
//         .post(`${apiPath}/patients`)
//         .set('x-auth-token', token)
//         .send({})
//         .expect(400).then((res) => {
//           expect(res.body).toHaveProperty('error')
//         })
//     })

//     test('Should 400 if email already in use', async () => {
//       const token = await createDoctorAndGetAuthToken()
//       const repository = getConnection(process.env.NODE_ENV).getRepository(Patient)
//       await repository.save({
//         id: '1',
//         name: 'Leonardo Rocha',
//         phone: '21 123456789',
//         email: 'leonardo.rocha@gmail.com',
//         birthday: '1995-03-08',
//         gender: Gender.MASCULINO,
//         height: 1.78,
//         weight: 80
//       })
//       await request(app)
//         .post(`${apiPath}/patients`)
//         .set('x-auth-token', token)
//         .send({
//           name: 'Leonardo Rocha',
//           phone: '21 123456789',
//           email: 'leonardo.rocha@gmail.com',
//           birthday: '1995-03-08',
//           gender: 'Masculino',
//           height: 1.78,
//           weight: 80
//         })
//         .expect(400).then((res) => {
//           expect(res.body).toHaveProperty('error')
//         })
//     })
//   })

//   describe('GET /patients', () => {
//     test('Should 200 and return all patients on success', async () => {
//       const token = await createDoctorAndGetAuthToken()
//       const repository = getConnection(process.env.NODE_ENV).getRepository(Patient)
//       await repository.save({
//         id: '1',
//         name: 'Leonardo Rocha',
//         phone: '21 123456789',
//         email: 'leonardo.rocha@gmail.com',
//         birthday: '1995-03-08',
//         gender: Gender.MASCULINO,
//         height: 1.78,
//         weight: 80
//       })
//       await request(app)
//         .get(`${apiPath}/patients`)
//         .set('x-auth-token', token)
//         .expect(200).then((res) => {
//           expect(res.body).toHaveLength(1)
//           expect(res.body[0].id).toBe('1')
//           expect(res.body[0].name).toBe('Leonardo Rocha')
//           expect(res.body[0].phone).toBe('21 123456789')
//           expect(res.body[0].email).toBe('leonardo.rocha@gmail.com')
//           expect(res.body[0].birthday).toBe('1995-03-08')
//           expect(res.body[0].gender).toBe('Masculino')
//           expect(res.body[0].height).toBe(1.78)
//           expect(res.body[0].weight).toBe(80)
//         })
//     })
//   })

//   describe('GET /patients/:id', () => {
//     test('Should 200 and return patient on success', async () => {
//       const token = await createDoctorAndGetAuthToken()
//       const repository = getConnection(process.env.NODE_ENV).getRepository(Patient)
//       await repository.save({
//         id: '1',
//         name: 'Leonardo Rocha',
//         phone: '21 123456789',
//         email: 'leonardo.rocha@gmail.com',
//         birthday: '1995-03-08',
//         gender: Gender.MASCULINO,
//         height: 1.78,
//         weight: 80
//       })
//       await request(app)
//         .get(`${apiPath}/patients/1`)
//         .set('x-auth-token', token)
//         .expect(200).then((res) => {
//           expect(res.body.id).toBe('1')
//           expect(res.body.name).toBe('Leonardo Rocha')
//           expect(res.body.phone).toBe('21 123456789')
//           expect(res.body.email).toBe('leonardo.rocha@gmail.com')
//           expect(res.body.birthday).toBe('1995-03-08')
//           expect(res.body.gender).toBe('Masculino')
//           expect(res.body.height).toBe(1.78)
//           expect(res.body.weight).toBe(80)
//         })
//     })

//     test('Should 404 if patient not found', async () => {
//       const token = await createDoctorAndGetAuthToken()
//       await request(app)
//         .get(`${apiPath}/patients/1`)
//         .set('x-auth-token', token)
//         .expect(404).then((res) => {
//           expect(res.body).toHaveProperty('error')
//         })
//     })
//   })

//   describe('DELETE /patients/:id', () => {
//     test('Should 204 on success', async () => {
//       const token = await createDoctorAndGetAuthToken()
//       const repository = getConnection(process.env.NODE_ENV).getRepository(Patient)
//       await repository.save({
//         id: '1',
//         name: 'Leonardo Rocha',
//         phone: '21 123456789',
//         email: 'leonardo.rocha@gmail.com',
//         birthday: '1995-03-08',
//         gender: Gender.MASCULINO,
//         height: 1.78,
//         weight: 80
//       })
//       await request(app)
//         .delete(`${apiPath}/patients/1`)
//         .set('x-auth-token', token)
//         .expect(204).then((res) => {
//           expect(res.body).toStrictEqual({})
//         })
//     })

//     test('Should 404 if patient not found', async () => {
//       const token = await createDoctorAndGetAuthToken()
//       await request(app)
//         .delete(`${apiPath}/patients/1`)
//         .set('x-auth-token', token)
//         .expect(404).then((res) => {
//           expect(res.body).toHaveProperty('error')
//         })
//     })
//   })
// })

test('Test without memory database', async () => {
  expect(1).toBe(1)
})
