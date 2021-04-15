import bcrypt from 'bcrypt'
import { IHasherComparer } from './interfaces/hasher-comparer.interface'

import { IHasher } from './interfaces/hasher.interface'

export class BCryptService implements IHasher, IHasherComparer {
  async hash (text: string): Promise<string> {
    const salt = 12
    return await bcrypt.hash(text, salt)
  }

  async compare (text: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(text, hashedText)
  }
}
