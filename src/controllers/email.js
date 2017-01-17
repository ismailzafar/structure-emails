import EmailModel from '../models/email'
import emailJob from '../jobs/send'
import RootController from 'structure-root-controller'

/**
 * EmailController Class
 *
 * @public
 * @class EmailController
 */
export default class Controller extends RootController {

  /**
   * EmailController constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'emails'
    }, options))
  }

  createApplicationEmails(req, res) {

    const applicationId = req.headers.applicationid
    const emailModel = new EmailModel()

    return emailModel.createApplicationEmails(applicationId)

  }

  getApplicationEmails(req, res) {

    const applicationId = req.headers.applicationid
    const emailModel = new EmailModel()

    return emailModel.getApplicationEmails(applicationId)

  }

  send(req, res) {

    const applicationId = req.headers.applicationid
    const pkg = req.body

    emailJob(pkg)

    return Promise.resolve()

  }

  updateApplicationEmails(req, res) {

    const applicationId = req.headers.applicationid
    const emailModel = new EmailModel()

    return emailModel.updateApplicationEmails(applicationId, req.body)

  }

}
