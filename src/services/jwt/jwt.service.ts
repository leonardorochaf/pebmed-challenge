import jwt from 'jsonwebtoken'
import { IDecodeToken } from './interfaces/decode-token.interface'

import { IGenerateToken } from './interfaces/generate-token.interface'

const SECRET = 'JWTSECRET'

export class JwtService implements IGenerateToken, IDecodeToken {
  async generate (text: string): Promise<string> {
    return jwt.sign({ doctorId: text }, SECRET, { expiresIn: '2d' })
  }

  async decode (token: string): Promise<string> {
    return jwt.decode(token, { complete: true }).payload.doctorId
  }
}
