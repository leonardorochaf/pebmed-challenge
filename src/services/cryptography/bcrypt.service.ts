import bcrypt from 'bcrypt'

import { IHasher } from './interfaces/hasher.interface'

export class BCryptService implements IHasher {
  async hash (text: string): Promise<string> {
    const salt = 12
    return await bcrypt.hash(text, salt)
  }
}
