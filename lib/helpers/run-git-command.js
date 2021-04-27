var { execFile } = require('child_process')
var { execFileSync } = require('child_process')
var path = require('path')
var removeEmptyLines = require('./remove-empty-lines')

module.exports = function (gitWorkTree, command, callback) {
  var gitCommand = gitWorkTree
    ? [
      'git',
      '--git-dir=' + path.join(gitWorkTree, '.git'),
      '--work-tree=' + gitWorkTree,
      command
    ].join(' ')
    : [
      'git',
      command
    ].join(' ')
  
  gitCommand = gitCommand.match(/('(\\'|[^'])*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g)

  if (callback) {
    console.log(gitCommand)
    execFile(gitCommand[0], gitCommand.slice(1), function (err, stdout) {
      if (err) { return callback(err) }
      callback(null, removeEmptyLines(stdout))
    })
  } else {
    console.log(gitCommand)
    return removeEmptyLines('' + execFileSync(gitCommand[0], gitCommand.slice(1)))
  }
}
