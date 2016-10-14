import Controller from './controllers/email'
import Dispatcher from 'structure-dispatcher'
const express = require('express')
const routes = express.Router()
const dispatch = new Dispatcher().dispatch

import schemaSend from './schemas/send'

const controller = new Controller()

routes.post(`/`, schemaSend, dispatch(controller, 'send'))

export default function routesHandler(options = {}) {

  return {
    routeName: 'emails',
    routes
  }

}
