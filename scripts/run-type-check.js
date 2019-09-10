'use strict'
const { command, skippableCommand } = require('./lib')
skippableCommand('SKIP_CODEGEN', 'npm', 'run', 'codegen')
command('tsc', '--noEmit')
