const { spawnSync } = require('child_process')

/**
 * Execute a command
 * @param {string} command Command to run
 * @param  {...string} args Arguments to pass to command
 */
function command (command, ...args) {
  console.info('$', command, ...args)
  const { error, status } = spawnSync(command, args, { stdio: 'inherit' })
  if (error) throw error
  if (status) throw process.exit(status)
}

module.exports = {
  command
}
