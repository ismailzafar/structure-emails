import Controller from './controllers/email'
import migrations from './migrations'
import Model from './models/email'
import routes from './routes'
import sendEmail from './jobs/send'

export default function pluginInterface(options = {}) {

  return routes(options)

}

const EmailController = Controller
const EmailModel = Model

const resources = {
  controllers: {
    Email: Controller
  },
  job: {
    send: sendEmail
  },
  models: {
    Email: Model
  }
}

const settings = {
  migrations,
  pluginName: 'emails'
}

export {EmailController}
export {EmailModel}
export {resources}
export {sendEmail}
export {settings}
