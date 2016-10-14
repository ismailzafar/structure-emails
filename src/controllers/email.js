//import EmailModel from '../models/email'
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

  send(req, res) {

    const pkg = req.body

    emailJob(pkg)

    return Promise.resolve()

  }

}
