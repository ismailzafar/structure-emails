import codes from '../../src/lib/error-codes'
import Migrations from 'structure-migrations'
import MockHTTPServer from '../helpers/mock-http-server'
import pluginsList from '../helpers/plugins'
import {q} from '../../src/jobs/send'
import r from '../helpers/driver'

Migrations.prototype.r = r
const server = new MockHTTPServer()

describe('Routes', function() {

  before(function() {

    this.migration = new Migrations({
      db: 'test',
      plugins: pluginsList
    })

    return this.migration.process()

  })

  afterEach(function() {
    return this.migration.purge()
  })

  it('should send an email', async function() {
    this.timeout(5000)

    var res = await server
      .post(`/api/${process.env.API_VERSION}/emails`)
      .send({
        from: 'bob@f12.tech',
        to: 'mail@chrisabrams.com',
        subject: 'Test Subject',
        text: 'Test text',
        html: 'Test html'
      })

    return new Promise( (resolve, reject) => {

      q.on('completed', () => {
        resolve()
      })

    })

  })

})
