var exec = require('child_process').execFile
var execSync = require('child_process').execFileSync
var path = require('path')
var removeEmptyLines = require('./remove-empty-lines')

module.exports = function (gitWorkTree, command, callback) {
  var gitCommand = gitWorkTree ?
  ['--git-dir', path.join(gitWorkTree),
  '--work-tree', gitWorkTree,
  ...command.split(' ') ] : command.split(' ')

  if (callback) {
    exec('git', gitCommand, function (err, stdout) {
      if (err) { return callback(err) }
      callback(null, removeEmptyLines(stdout))
    })
  } else {
    return removeEmptyLines('' + execSync('git', gitCommand))
  }
}
