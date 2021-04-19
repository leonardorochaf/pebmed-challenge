/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { deleteScheduleFactory } from '../factories/schedule/delete-schedule.factory'

import { getAllSchedulesByDoctorFactory } from '../factories/schedule/get-all-schedules-by-doctor.factory'
import { registerScheduleFactory } from '../factories/schedule/register-schedule.factory'
import { updateScheduleFactory } from '../factories/schedule/update-schedule.factory'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/', authMiddleware, (req, res) => {
  registerScheduleFactory().handle(req, res)
})

router.get('/', authMiddleware, (req, res) => {
  getAllSchedulesByDoctorFactory().handle(req, res)
})

router.put('/:id', authMiddleware, (req, res) => {
  updateScheduleFactory().handle(req, res)
})

router.delete('/:id', authMiddleware, (req, res) => {
  deleteScheduleFactory().handle(req, res)
})

export default router
