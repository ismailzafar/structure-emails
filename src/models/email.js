import RootModel from 'structure-root-model'

/**
 * EmailModel Class
 *
 * @public
 * @class EmailModel
 */
export default class EmailModel extends RootModel {

  /**
   * EmailModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      table: 'jobs_emails'
    }, options))
  }

}
