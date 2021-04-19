import { Router } from 'express'
import { getAllSchedulesByDoctorFactory } from '../factories/schedule/get-all-schedules-by-doctor.factory'
import { registerScheduleFactory } from '../factories/schedule/register-schedule.factory'

const router = Router()

router.post('/', (req, res) => {
  registerScheduleFactory().handle(req, res)
})

router.get('/', (req, res) => {
  getAllSchedulesByDoctorFactory().handle(req, res)
})

export default router
