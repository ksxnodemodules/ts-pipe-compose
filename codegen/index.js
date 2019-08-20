#! /usr/bin/env node
const process = require('process')

require('json5/lib/register')

const { compilerOptions } = require('../tsconfig.json')

require('ts-node').register({
  typeCheck: false,
  transpileOnly: true,
  compilerOptions: {
    ...compilerOptions,
    noUnusedLocals: false,
    noUnusedParameters: false
  }
})

require('./main').main().then(
  status => process.exit(status),
  error => {
    console.error(error)
    process.exit(-1)
  }
)
