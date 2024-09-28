import { Router } from 'express'
import { getLogoutHandler } from '../controllers/logout.mjs'

const logoutRouter = Router()

logoutRouter.route('/')
  .get(getLogoutHandler)

export default logoutRouter