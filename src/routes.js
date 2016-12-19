import Controller from './controllers/email'
import Dispatcher from 'structure-dispatcher'
const express = require('express')
const routes = express.Router()
const dispatcher = new Dispatcher()
const dispatch = dispatcher.dispatch
const respond = dispatcher.respond

import schemaSend from './schemas/send'

const controller = new Controller()

routes.get(`/applications/:applicationId`, dispatch(controller, 'getApplicationEmails'), respond())
routes.patch(`/applications/:applicationId`, dispatch(controller, 'updateApplicationEmails'), respond())
routes.post(`/applications/:applicationId`, dispatch(controller, 'createApplicationEmails'), respond())
routes.post(`/`, schemaSend, dispatch(controller, 'send'), respond())

export default function routesHandler(options = {}) {

  return {
    routeName: 'emails',
    routes
  }

}
