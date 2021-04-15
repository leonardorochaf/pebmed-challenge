import jwt from 'jsonwebtoken'

import { IGenerateToken } from './interfaces/generate-token.interface'

const SECRET = 'JWTSECRET'

export class JwtService implements IGenerateToken {
  async generate (text: string): Promise<string> {
    return jwt.sign({ doctorId: text }, SECRET, { expiresIn: '2d' })
  }
}
