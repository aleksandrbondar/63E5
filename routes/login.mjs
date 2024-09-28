import { Router } from 'express'
import { getLoginHandler, postLoginHandler } from '../controllers/login.mjs'
import passport from 'passport'
import validateUserLogin from '../utils/validateUserLogin.mjs'

const loginRouter = Router()

loginRouter.route('/')
  .get(getLoginHandler)
  .post(validateUserLogin, postLoginHandler, passport.authenticate('local'))

export default loginRouter