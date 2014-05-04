var childProcess = require('child_process');

function Shell(name) {
    this.name = name;
}

Shell.prototype.invoke = function(args, scope) {
    var p = childProcess.spawn(this.name, args);
    return {
        output: p.stdout,
        input: p.stdin
    };
}

module.exports = Shell;
