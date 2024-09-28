import { Router } from 'express'
import passport from 'passport'
import { getRegisterHandler, postRegisterHandler } from '../controllers/register.mjs'
import validateUserReg from '../utils/validateUserReg.mjs'


const registerRouter = Router()

registerRouter.route('/')
  .get(getRegisterHandler)
  .post(validateUserReg, postRegisterHandler, passport.authenticate('local'))

export default registerRouter