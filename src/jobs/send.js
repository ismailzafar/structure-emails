import logger from 'structure-logger'
import nodemailer from 'nodemailer'
import Queue from 'rethinkdb-job-queue'
import RootModel from 'structure-root-model'
import sgTransport from 'nodemailer-sendgrid-transport'
const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    //api_user: process.env.SENDGRID_USERNAME,
    api_key: process.env.SENDGRID_API_KEY
  }
}))

const cxnOptions = {
  db: process.env.RETHINK_DB_NAME,
  host: process.env.RETHINK_DB_HOST,
  port: process.env.RETHINK_DB_PORT
}

const queueOptions = {
  //masterInterval: 1,
  name: 'jobs_emails',
  removeFinishedJobs: true,
  retryMax: 2
}

const q = new Queue(cxnOptions, queueOptions)

function onCompleted() {
  logger.debug('Job Emails: Completed')
}

function onError(e) {
  logger.error('Job Emails: Error')
  logger.error(e)
}

function onRemoved() {
  logger.debug('Job Emails: Removed')
}

q.on('completed', onCompleted)
q.on('error', onError)
q.on('removed', onRemoved)

q.jobOptions = {
  priority: 'high',
  timeout: 300000,
  retryMax: 3, // Four attempts, first then three retries
  retryDelay: 600000 // Time in milliseconds to delay retries
}

async function emailHandler(job, next) {
  const data = job.data

  try {

    // Setup e-mail data with unicode symbols
    var mailOptions = {
      from: data.from, // Sender address
      subject: data.subject || '', // Subject line
      text: data.text || '', // Plaintext body
      html: data.html || '', // HTML body,
      to: data.to
    }

    const info = await transporter.sendMail(mailOptions)
    //console.error(info)

    next()

  }
  catch(err) {
    logger.error(err)

    return next(err)
  }

}

q.process(emailHandler)

export default async function emailJob(data = {}, options = {}) {

  let job = q.createJob()

  job.data = data

  try {
    logger.debug('Job Email added to queue')
    await q.addJob(job)
  }
  catch(e) {
    logger.debug('Job Email could not add to queue')
    logger.debug(e)
  }

}

export {q}
