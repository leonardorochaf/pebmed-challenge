import { Router } from 'express'
import { loginFactory } from '../factories/auth/login.factory'
import { signUpFactory } from '../factories/auth/sign-up.factory'

const router = Router()

router.post('/signup', (req, res) => {
  signUpFactory().handle(req, res)
})

router.post('/login', (req, res) => {
  loginFactory().handle(req, res)
})

export default router
