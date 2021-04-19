import { Router } from 'express'
import { registerScheduleFactory } from '../factories/schedule/register-schedule.factory'

const router = Router()

router.post('/', (req, res) => {
  registerScheduleFactory().handle(req, res)
})

export default router
