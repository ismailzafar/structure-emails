import Controller from './controllers/email'
import {dispatch} from 'structure-dispatcher'

const express = require('express')
const routes = express.Router()

import schemaSend from './schemas/send'

const controller = new Controller()

routes.post(`/send`, schemaSend, dispatch(controller, 'send'))

routes.get(`/`,   dispatch(controller, 'getApplicationEmails'))
routes.patch(`/`, dispatch(controller, 'updateApplicationEmails'))
routes.post(`/`,  dispatch(controller, 'createApplicationEmails'))

export default function routesHandler(options = {}) {

  return {
    routeName: 'emails',
    routes
  }

}
