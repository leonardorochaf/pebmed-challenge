import { IGetActiveSessionByTokenRepository } from '../../repositories/session/interfaces/get-active-session-by-token.respository.interface'
import { ILogoutUsecase } from './interfaces/logout.usecase.interface'

export class LogoutUsecase implements ILogoutUsecase {
  constructor (
    private readonly getActiveSessionByTokenRepository: IGetActiveSessionByTokenRepository
  ) { }

  async execute (token: string): Promise<void> {
    await this.getActiveSessionByTokenRepository.getActiveByToken(token)
  }
}
