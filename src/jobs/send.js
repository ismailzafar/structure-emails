import Job from 'structure-job'
import logger from 'structure-logger'
import r from 'structure-driver'

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class SendEmailJob extends Job {

  constructor(options = {}) {

    super(Object.assign({}, {
      interval: 1000,
      label: options.label || 'Send email',
      priority: 'high',
      table: options.table || 'jobs_default_emails'
    }, options))

  }

  async handler(job) {

    logger.debug('Handler fired')

    return new Promise((resolve, reject) => {

      try {

        const data = job.data
        data.from = data.from || process.env.EMAIL_FROM

        logger.info('Sendgrid email data package', data)

        const msg = {
          to: data.to,
          from: data.from,
          subject: data.subject,
          text: data.text,
        };

        sgMail.send(msg, (error, result) => {

          if (error) {
            logger.error('Error sending email', error.toString())
            return reject(error)
          }

          logger.info('Sendgrid email delivered')

          resolve()

        })

      } catch(e) {

        logger.error('Error sending email', e)
        reject(e)

      }

    })

  }

}

const job = new SendEmailJob()
const q = job.q

export default job
export {q}
