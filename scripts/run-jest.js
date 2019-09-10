'use strict'
const { command, skippableCommand } = require('./lib')
skippableCommand('SKIP_COMPILE', 'npm', 'run', 'compile:cjs')
command('jest', '--coverage')
