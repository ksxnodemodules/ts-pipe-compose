const { spawnSync } = require('child_process')

/**
 * Execute a command
 * @param {string} cmd Command to run
 * @param  {...string} args Arguments to pass to command
 */
function command (cmd, ...args) {
  console.info('$', cmd, ...args)
  const { error, status } = spawnSync(cmd, args, { stdio: 'inherit' })
  if (error) throw error
  if (status) throw process.exit(status)
}

module.exports = {
  command
}
