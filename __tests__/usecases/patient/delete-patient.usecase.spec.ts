import faker from 'faker'
import { PatientNotFoundError } from '../../../src/errors/patient-not-found-error'

import { Patient } from '../../../src/models/Patient'
import { IDeletePatientRepository } from '../../../src/repositories/patient/interfaces/delete-patient.repository.interface'
import { IGetPatientByIdRepository } from '../../../src/repositories/patient/interfaces/get-patient-by-id.repository.interface'
import { DeletePatientUsecase } from '../../../src/usecases/patient/delete-patient.usecase'
import { Gender } from '../../../src/utils/gender-enum'

const mockRequestId = faker.datatype.uuid()

const mockResponse = {
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
}

class GetPatientByIdRepositoryStub implements IGetPatientByIdRepository {
  async getById (patientId: string): Promise<Patient> {
    return mockResponse
  }
}

class DeletePatientRepositoryStub implements IDeletePatientRepository {
  async logicalDelete (patientId: string): Promise<void> { }
}

type SutTypes = {
  sut: DeletePatientUsecase
  getPatientByIdRepositoryStub: GetPatientByIdRepositoryStub
  deletePatientRepositoryStub: DeletePatientRepositoryStub
}

const sutFactory = (): SutTypes => {
  const deletePatientRepositoryStub = new DeletePatientRepositoryStub()
  const getPatientByIdRepositoryStub = new GetPatientByIdRepositoryStub()
  const sut = new DeletePatientUsecase(getPatientByIdRepositoryStub, deletePatientRepositoryStub)
  return {
    sut,
    getPatientByIdRepositoryStub,
    deletePatientRepositoryStub
  }
}

describe('Delete Patient Usecase', () => {
  test('Should call GetPatientByIdRepository with correct id', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    const getByIdSpy = jest.spyOn(getPatientByIdRepositoryStub, 'getById')
    await sut.execute(mockRequestId)
    expect(getByIdSpy).toHaveBeenCalledWith(mockRequestId)
  })

  test('Should throw PatientNotFoundError if GetPatientByIdRepository returns null', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByIdRepositoryStub, 'getById').mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.execute(mockRequestId)
    await expect(promise).rejects.toThrow(PatientNotFoundError)
  })

  test('Should throw if GetPatientByIdRepository throws', async () => {
    const { sut, getPatientByIdRepositoryStub } = sutFactory()
    jest.spyOn(getPatientByIdRepositoryStub, 'getById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockRequestId)
    await expect(promise).rejects.toThrow()
  })

  test('Should call DeletePatientRepository with correct id', async () => {
    const { sut, deletePatientRepositoryStub } = sutFactory()
    const logicalDeleteSpy = jest.spyOn(deletePatientRepositoryStub, 'logicalDelete')
    await sut.execute(mockRequestId)
    expect(logicalDeleteSpy).toHaveBeenCalledWith(mockRequestId)
  })
})
