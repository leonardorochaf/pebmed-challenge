import { Doctor } from '../../../models/Doctor'

export interface ISaveSessionRepository {
  createAndSave: (data: SaveSessionData) => Promise<void>
}

export type SaveSessionData = {
  token: string
  doctor: Doctor
}
