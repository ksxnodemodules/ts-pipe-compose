'use strict'
const process = require('process')
const { command } = require('./lib')

if (process.env.SKIP_COMPILE === 'true') {
  console.info('Skip compilation step [SKIP_COMPILE=true]')
} else {
  command('npm', 'run', 'compile:cjs')
}

command('jest', '--coverage')
