import codes from '../../src/lib/error-codes'
import Migrations from 'structure-migrations'
import MockHTTPServer from '../helpers/mock-http-server'
import pluginsList from '../helpers/plugins'
import {q} from '../../src/jobs/send'

const server = new MockHTTPServer()

const createOrgAndApp = async function(){
  // getting an organization and application Ids
  var res0 = await new MockHTTPServer()
    .post(`/api/${process.env.API_VERSION}/organizations`)
    .send({
      title: 'work it'
    })

  const org = res0.body.pkg
  const orgId = org.id

  var app = await new MockHTTPServer()
    .post(`/api/${process.env.API_VERSION}/applications`)
    .set('organizationid', orgId)
    .send({
      desc: '',
      title: 'App 45'
    })

  const appId = app.body.pkg.id

  return {orgId, appId}

}

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

  it('should create an application email object', async function() {

    const {orgId, appId} = await createOrgAndApp()

    var emailRes = await server
      .post(`/api/${process.env.API_VERSION}/emails`)
      .set('organizationid', orgId)
      .set('applicationid', appId)
      .send()

    expect(emailRes.body.pkg.id).to.equal(appId)

  })

  it('should get an application email object', async function() {

    const {orgId, appId} = await createOrgAndApp()

    var emailRes = await server
      .post(`/api/${process.env.API_VERSION}/emails`)
      .set('organizationid', orgId)
      .set('applicationid', appId)
      .send()

    emailRes = await server
      .patch(`/api/${process.env.API_VERSION}/emails`)
      .set('organizationid', orgId)
      .set('applicationid', appId)
      .send({
        inviteUser: 'Welcome {{userId}}!'
      })

    emailRes = await server
      .get(`/api/${process.env.API_VERSION}/emails`)
      .set('organizationid', orgId)
      .set('applicationid', appId)

    const emails = emailRes.body.pkg

    expect(emails.id).to.equal(appId)
    expect(emails.inviteUser).to.equal('Welcome {{userId}}!')

  })

  it.skip('should send an email', async function() {
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
