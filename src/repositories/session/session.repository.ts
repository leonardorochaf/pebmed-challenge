import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Session } from '../../models/Session'
import { ISaveSessionRepository, SaveSessionData } from './interfaces/save-session.repository.interface'
import { IGetActiveSessionByTokenRepository } from './interfaces/get-active-session-by-token.respository.interface'
import { IDeleteSessionRepository } from './interfaces/delete-session.repository.interface'

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> implements
  ISaveSessionRepository,
  IGetActiveSessionByTokenRepository,
  IDeleteSessionRepository {
  async createAndSave (params: SaveSessionData): Promise<void> {
    const createdSession = this.create(params)
    createdSession.id = uuid()
    await this.save(createdSession)
  }

  async getActiveByToken (token: string): Promise<Session> {
    return await this.findOne({ token })
  }

  async logicalDelete (sessionId: string): Promise<void> {
    await this.softDelete({ id: sessionId })
  }
}
