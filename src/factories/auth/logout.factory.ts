import { getCustomRepository } from 'typeorm'

import { LogoutController } from '../../controllers/auth/logout.controller'
import { SessionRepository } from '../../repositories/session/session.repository'
import { LogoutUsecase } from '../../usecases/auth/logout.usecase'

export const logoutFactory = (): LogoutController => {
  const sessionRepository = getCustomRepository(SessionRepository, process.env.NODE_ENV)
  const logoutUsecase = new LogoutUsecase(sessionRepository, sessionRepository)
  return new LogoutController(logoutUsecase)
}
