const process = require('process')
const { spawnSync } = require('child_process')
const { createPrettyExec } = require('pretty-exec')
const chalk = require('chalk')

const prettyExec = createPrettyExec({
  spawn: spawnSync,
  print: console.info
})

/**
 * Execute a command
 * @param {string} cmd Command to run
 * @param {...string} args Arguments to pass to command
 */
function command (cmd, ...args) {
  const { error, status } = prettyExec(cmd, args)
  if (error) throw error
  if (status) throw process.exit(status)
}

/**
 * Execute a command when environment variable of name `[env]` is not `'true'`
 * @param {string} env Name of environment variable that decides when to skip
 * @param {string} cmd Command to execute
 * @param {...string} args Arguments to pass to command
 */
function skippableCommand (env, cmd, ...args) {
  if (process.env[env] === 'true') {
    const cliString = [cmd, ...args].join(' ')
    const message = chalk.dim(`$ ${chalk.strikethrough(cliString)} [${env}=true]`)
    console.info(message)
  } else {
    command(cmd, ...args)
  }
}

module.exports = {
  prettyExec,
  command,
  skippableCommand
}
