import { Gender } from '../../utils/gender-enum'

export type DefaultPatientResponse = {
  id: string
  name: string
  phone: string
  email: string
  birthday: Date
  gender: Gender
  height: number
  weight: number
}
