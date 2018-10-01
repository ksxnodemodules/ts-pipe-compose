'use strict'
const iter = require('iter-tools')

const test = {
  displayName: 'test',
  transform: {
    '\\.jsx?$': 'babel-jest',
    '\\.tsx?$': 'ts-jest',
    '\\.(yaml|yml)$': 'yaml-jest'
  },
  testMatch: Array.from(
    iter.map(
      ([a, b]) => `**/*.${a}.${b}`,
      iter.product(
        ['test', 'spec', 'check'],
        ['ts', 'js', 'tsx', 'jsx']
      )
    )
  ),
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '\\/check\\/',
    '\\/test\\/',
    '\\/.polyfill\\/',
    '.*\\.json$',
    '.*\\.yaml$',
    '.*\\.yml$'
  ],
  testEnvironment: 'node'
}

const standardjs = {
  displayName: 'standardjs',
  runner: 'runner-jest-standard',
  testMatch: [
    '**/*.js',
    '**/*.jsx'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/'
  ]
}

const tslint = {
  displayName: 'tslint',
  runner: 'runner-jest-tslint',
  testMatch: [
    '**/*.ts',
    '**/*.tsx'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/'
  ]
}

module.exports = {
  projects: {
    test,
    standardjs,
    tslint
  }
}
