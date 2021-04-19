import { Router } from 'express'
import { deleteScheduleFactory } from '../factories/schedule/delete-schedule.factory'

import { getAllSchedulesByDoctorFactory } from '../factories/schedule/get-all-schedules-by-doctor.factory'
import { registerScheduleFactory } from '../factories/schedule/register-schedule.factory'
import { updateScheduleFactory } from '../factories/schedule/update-schedule.factory'

const router = Router()

router.post('/', (req, res) => {
  registerScheduleFactory().handle(req, res)
})

router.get('/', (req, res) => {
  getAllSchedulesByDoctorFactory().handle(req, res)
})

router.put('/:id', (req, res) => {
  updateScheduleFactory().handle(req, res)
})

router.delete('/:id', (req, res) => {
  deleteScheduleFactory().handle(req, res)
})

export default router
