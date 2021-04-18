import faker from 'faker'
import { IDecodeToken } from '../../../src/services/jwt/interfaces/decode-token.interface'
import { GetAllSchedulesByDoctorUsecase } from '../../../src/usecases/schedule/get-all-schedules-by-doctor.usecase'

const mockRequestToken = faker.datatype.uuid()

const mockDecodeTokenResponse = faker.datatype.uuid()

class DecodeTokenStub implements IDecodeToken {
  async decode (token: string): Promise<string> {
    return mockDecodeTokenResponse
  }
}

type SutTypes = {
  sut: GetAllSchedulesByDoctorUsecase
  decodeTokenStub: DecodeTokenStub
}

const sutFactory = (): SutTypes => {
  const decodeTokenStub = new DecodeTokenStub()
  const sut = new GetAllSchedulesByDoctorUsecase(decodeTokenStub)
  return {
    sut,
    decodeTokenStub
  }
}

describe('Get All Schedules By Doctor Usecase', () => {
  test('Should call DecodeToken with correct token', async () => {
    const { sut, decodeTokenStub } = sutFactory()
    const decodeSpy = jest.spyOn(decodeTokenStub, 'decode')
    await sut.execute(mockRequestToken)
    expect(decodeSpy).toHaveBeenCalledWith(mockRequestToken)
  })

  test('Should throw if DecodeToken throws', async () => {
    const { sut, decodeTokenStub } = sutFactory()
    jest.spyOn(decodeTokenStub, 'decode').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute(mockDecodeTokenResponse)
    await expect(promise).rejects.toThrow()
  })
})
