import jwt from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm'

import { SessionRepository } from '../../repositories/session/session.repository'
import { IDecodeToken } from './interfaces/decode-token.interface'
import { IGenerateToken } from './interfaces/generate-token.interface'
import { IValidateToken } from './interfaces/validate-token'

const SECRET = 'JWTSECRET'

export class JwtService implements IGenerateToken, IDecodeToken, IValidateToken {
  async generate (text: string): Promise<string> {
    return jwt.sign({ doctorId: text }, SECRET, { expiresIn: '2d' })
  }

  async decode (token: string): Promise<string> {
    return jwt.decode(token, { complete: true }).payload.doctorId
  }

  async validate (token: string): Promise<boolean> {
    jwt.verify(token, SECRET, { ignoreExpiration: false }, (e: Error) => {
      if (e) return false
    })

    const session = await getCustomRepository(SessionRepository, process.env.NODE_ENV).getActiveByToken(token)
    if (!session) {
      return false
    }
    return true
  }
}
