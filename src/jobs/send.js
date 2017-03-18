import Job from 'structure-job'
import logger from 'structure-logger'
import r from 'structure-driver'

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

class SendEmailJob extends Job {

  constructor(options = {}) {

    super(Object.assign({}, {
      interval: 1000,
      label: options.label || 'Send email',
      priority: 'high',
      table: options.table || 'jobs_default_emails'
    }, options))

  }

  handler(job) {
    logger.debug('Handler fired')

    return new Promise( async (resolve, reject) => {

      try {

        const data = job.data

        const request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: {
            personalizations: [
              {
                to: [
                  {
                    email: data.to,
                  },
                ],
                subject: data.subject || '' // Subject line,
              },
            ],
            from: {
              email: data.from || process.env.EMAIL_FROM,
            },
            content: [
              {
                type: 'text/plain',
                value: data.text,
              },
            ],
          },
        })

        const response = await sg.API(request)

        logger.info('Sendgrid email delivered', response)

        resolve()

      }
      catch(e) {
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
