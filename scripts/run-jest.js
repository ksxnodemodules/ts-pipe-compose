'use strict'
const { command, skippableCommand } = require('./lib')
skippableCommand('SKIP_CODEGEN', 'npm', 'run', 'codegen')
skippableCommand('SKIP_COMPILE', 'npm', 'run', 'compile:cjs')
command('jest', '--coverage')
