import Controller from './controllers/email'
import migrations from './migrations'
import Model from './models/email'
import routes from './routes'
import sendEmailJob from './jobs/send'

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
    send: sendEmailJob
  },
  models: {
    Email: Model
  }
}

const settings = {
  migrations,
  pluginName: 'emails'
}

const sendEmail = sendEmailJob.queue.bind(sendEmailJob)

export {EmailController}
export {EmailModel}
export {resources}
export {sendEmail}
export {sendEmailJob}
export {settings}
