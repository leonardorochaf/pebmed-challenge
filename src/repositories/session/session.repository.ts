import { v4 as uuid } from 'uuid'
import { EntityRepository, Repository } from 'typeorm'

import { Session } from '../../models/Session'
import { ISaveSessionRepository, SaveSessionData } from './interfaces/save-session.repository.interface'

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> implements ISaveSessionRepository {
  async createAndSave (params: SaveSessionData): Promise<void> {
    const createdSession = this.create(params)
    createdSession.id = uuid()
    await this.save(createdSession)
  }
}
