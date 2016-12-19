import logger from 'structure-logger'
import r from 'structure-driver'
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
      table: 'applications_emails'
    }, options))
  }

  createApplicationEmails(appId) {

    return new Promise( async (resolve, reject) => {

      try {

        const res = await r
          .table(this.table)
          .insert({id: appId}, {returnChanges: true})

        resolve(res.changes[0].new_val)

      }
      catch(e) {
        logger.error(e)

        reject(e)

      }

    })

  }

  getApplicationEmails(appId) {

    return new Promise( async (resolve, reject) => {

      try {

        const res = await r
          .table(this.table)
          .get(appId)

        resolve(res)

      }
      catch(e) {
        logger.error(e)

        reject(e)

      }

    })

  }

  updateApplicationEmails(appId, pkg) {

    pkg.id = appId

    return new Promise( async (resolve, reject) => {

      try {

        const res = await r
          .table(this.table)
          .insert(pkg, {
            conflict: 'update',
            returnChanges: true
          })

        resolve(res.changes[0].new_val)

      }
      catch(e) {
        logger.error(e)

        reject(e)

      }

    })

  }

}
