import faker from 'faker'

import { Appointment } from '../../../src/models/Appointment'
import { IGetAllAppointmentsByPatientRepository } from '../../../src/repositories/appointment/interfaces/get-all-appointments-by-patient.repository.interface'
import { GetAllAppointmentsByPatientUsecase } from '../../../src/usecases/appointment/get-all-appointments-by-patient.usecase'
import { Gender } from '../../../src/utils/gender-enum'

const mockRequestid = faker.datatype.uuid()

const mockResponse = [{
  id: faker.datatype.uuid(),
  observation: faker.random.words(),
  createdAt: faker.date.past(),
  schedule: {
    id: faker.datatype.uuid(),
    time: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    patient: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      birthday: faker.date.past(),
      gender: Gender.MASCULINO,
      height: faker.datatype.float({ min: 0, max: 2.5 }),
      weight: faker.datatype.float({ min: 0, max: 100 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      deletedAt: null
    },
    doctor: null
  }
}]

class GetAllAppointmentsByPatientRepositoryStub implements IGetAllAppointmentsByPatientRepository {
  async getAllByPatient (patientId: string): Promise<Appointment[]> {
    return mockResponse
  }
}

type SutTypes = {
  sut: GetAllAppointmentsByPatientUsecase
  getAllAppointmentsByPatientRepositoryStub: GetAllAppointmentsByPatientRepositoryStub
}

const sutFactory = (): SutTypes => {
  const getAllAppointmentsByPatientRepositoryStub = new GetAllAppointmentsByPatientRepositoryStub()
  const sut = new GetAllAppointmentsByPatientUsecase(getAllAppointmentsByPatientRepositoryStub)
  return {
    sut,
    getAllAppointmentsByPatientRepositoryStub
  }
}

describe('Get All Appointments By Patient Usecase', () => {
  test('Should call GetAllAppointmentsByPatientRepository with correct id', async () => {
    const { sut, getAllAppointmentsByPatientRepositoryStub } = sutFactory()
    const getAllByPatientSpy = jest.spyOn(getAllAppointmentsByPatientRepositoryStub, 'getAllByPatient')
    await sut.execute(mockRequestid)
    expect(getAllByPatientSpy).toHaveBeenCalledWith(mockRequestid)
  })

  test('Should throw if GetAllAppointmentsByPatientRepository throws', async () => {
    const { sut, getAllAppointmentsByPatientRepositoryStub } = sutFactory()
    jest.spyOn(getAllAppointmentsByPatientRepositoryStub, 'getAllByPatient').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequestid)
    await expect(promise).rejects.toThrow()
  })
})
