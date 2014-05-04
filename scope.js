var util = require('util'),
    Program = require('./program'),
    Static = require('./static'),
    Shell = require('./shell'),
    fs = require('fs');

function Scope(parent) {
    this.parent = parent;
    this.symbols = {};
}

Scope.prototype.set = function(name, value) {
    if (typeof name == 'object') {
        for (var n in name) {
            this.set(n, name[n]);
        }
        return;
    }
    if (typeof value == 'function') {
        value = new Program(value, this);
    } else {
        value = new Static(value);
    }
    return (this.symbols[name] = value);
}

Scope.prototype.lookup = function(name, canBeProgram) {
    if (typeof name !== 'string') throw new Error('Invalid property: ' + name);
    if (this.symbols.hasOwnProperty(name)) {
        return this.symbols[name];
    } else if (this.parent) {
        return this.parent.lookup(name);
    } else if (this.isProgram(name) && canBeProgram) {
        return new Shell(name);
    }
    throw new Error('Unknown program: ' + name);
}

Scope.prototype.isProgram = function(name) {
    return process.env.PATH.split(':').some(function(dir){
        return fs.existsSync(dir + '/' + name);
    });
};

Scope.prototype.define = function(name, cb) {
    this.set(name, cb);
}

function TopLevel() {
    Scope.apply(this, arguments);

    var self = this;

    function write(output, buffer) {
        output.write(buffer + "\n");
        output.end();
    }

    // The programs should receive the stream to which output should be sent—could potentially be defined in TopLevel scope
    this.define('+', function(a, b) {
        write(this.output, a+b);
    });
    this.define('-', function(a, b) {
        write(this.output, a-b);
    });
    this.define('*', function(a, b) {
        write(this.output, a*b);
    });
    this.define('/', function(a, b) {
        write(this.output, a/b);
    });
    this.define(':', function(name, value){
        self.set(name, value);
        this.output.end();
    });
}

util.inherits(TopLevel, Scope);

Scope.TopLevel = TopLevel;
module.exports = Scope;
