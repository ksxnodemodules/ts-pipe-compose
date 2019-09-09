'use strict'
const process = require('process')
const { command } = require('./lib')

if (process.env.SKIP_CODEGEN === 'true') {
  console.info('Skip code generation step [SKIP_CODEGEN=true]')
} else {
  command('npm', 'run', 'codegen')
}

command('tsc', '--noEmit')
