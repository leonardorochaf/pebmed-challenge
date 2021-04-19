/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextFunction, Request, Response } from 'express'

import { JwtService } from '../services/jwt/jwt.service'

export async function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const token = String(req.headers['x-auth-token'])

  const result = await new JwtService().validate(token)

  if (result) {
    next()
  } else {
    return res.status(401).json({ error: 'Sessão expirada' })
  }
}
