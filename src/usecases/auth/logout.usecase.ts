import { IDeleteSessionRepository } from '../../repositories/session/interfaces/delete-session.repository.interface'
import { IGetActiveSessionByTokenRepository } from '../../repositories/session/interfaces/get-active-session-by-token.respository.interface'
import { ILogoutUsecase } from './interfaces/logout.usecase.interface'

export class LogoutUsecase implements ILogoutUsecase {
  constructor (
    private readonly getActiveSessionByTokenRepository: IGetActiveSessionByTokenRepository,
    private readonly deleteSessionRepository: IDeleteSessionRepository
  ) { }

  async execute (token: string): Promise<void> {
    const activeSession = await this.getActiveSessionByTokenRepository.getActiveByToken(token)
    if (!activeSession) return

    await this.deleteSessionRepository.logicalDelete(activeSession.id)
  }
}
