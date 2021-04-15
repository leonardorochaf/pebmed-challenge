import { Router } from 'express'
import { signUpFactory } from '../factories/auth/sign-up.factory'

const router = Router()

router.post('/signup', (req, res) => {
  signUpFactory().handle(req, res)
})

export default router
