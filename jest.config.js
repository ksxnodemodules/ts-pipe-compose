'use strict'
const iter = require('iter-tools')

module.exports = {
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
