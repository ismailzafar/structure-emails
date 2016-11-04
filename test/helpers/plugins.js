import {errors} from 'structure-dispatcher'
const Plugin = require('../../src/index')

export default [
  'structure-applications',
  'structure-users',
  Plugin,
  errors()
]
