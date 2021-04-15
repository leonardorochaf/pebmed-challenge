import { Session } from '../../../models/Session'

export interface IGetActiveSessionByTokenRepository {
  getActiveByToken: (token: string) => Promise<Session>
}
