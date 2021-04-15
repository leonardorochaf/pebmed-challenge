import { Router } from 'express'

import { loginFactory } from '../factories/auth/login.factory'
import { logoutFactory } from '../factories/auth/logout.factory'
import { signUpFactory } from '../factories/auth/sign-up.factory'

const router = Router()

router.post('/signup', (req, res) => {
  signUpFactory().handle(req, res)
})

router.post('/login', (req, res) => {
  loginFactory().handle(req, res)
})

router.post('/logout', (req, res) => {
  logoutFactory().handle(req, res)
})

export default router
