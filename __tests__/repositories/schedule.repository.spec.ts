import faker from 'faker'
import { getCustomRepository } from 'typeorm'
import connectionHelper from '../../src/database/connection-helper'
import { DoctorRepository } from '../../src/repositories/doctor/doctor.repository'
import { PatientRepository } from '../../src/repositories/patient/patient.repository'
import { ScheduleRepository } from '../../src/repositories/schedule/schedule.repository'
import { Gender } from '../../src/utils/gender-enum'

const saveRequest = {
  time: faker.date.soon(),
  patientId: null,
  doctorId: null
}

describe('Schedule Repository', () => {
  beforeAll(async () => {
    await connectionHelper.create()
  })

  afterAll(async () => {
    await connectionHelper.close()
  })

  afterEach(async () => {
    await connectionHelper.clear()
  })

  test('Should save a schedule and return it', async () => {
    const sut = getCustomRepository(ScheduleRepository, process.env.NODE_ENV)
    const doctorRepository = getCustomRepository(DoctorRepository, process.env.NODE_ENV)
    const patientRepository = getCustomRepository(PatientRepository, process.env.NODE_ENV)
    const createdPatient = await patientRepository.createAndSave({
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      birthday: faker.date.past(),
      gender: Gender.MASCULINO,
      height: faker.datatype.float({ min: 0, max: 2.5 }), /*  */
      weight: faker.datatype.float({ min: 0, max: 100 })
    })
    const createdDoctor = await doctorRepository.createAndSave({
      name: faker.name.findName(),
      email: faker.internet.email(),
      hashedPassword: faker.datatype.uuid()
    })
    saveRequest.patientId = createdPatient.id
    saveRequest.doctorId = createdDoctor.id
    const createdSchedule = await sut.createAndSave(saveRequest)
    expect(createdSchedule.id).toBeTruthy()
    expect(createdSchedule.patient.id).toBe(createdPatient.id)
  })
})
