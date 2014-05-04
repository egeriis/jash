var util = require('util'),
    Program = require('./program'),
    Static = require('./static');

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

Scope.prototype.lookup = function(name) {
    if (typeof name !== 'string') throw new Error('Invalid property: ' + name);
    if (this.symbols.hasOwnProperty(name)) {
        return this.symbols[name];
    } else if (this.parent) {
        return this.parent.lookup(name);
    }
    throw new Error('Unknown program: ' + name);
}

Scope.prototype.define = function(name, cb) {
    this.set(name, cb);
}

function TopLevel() {
    Scope.apply(this, arguments);

    // The programs should receive the stream to which output should be sent—could potentially be defined in TopLevel scope
    this.define('+', function(a, b) {
        return a + b;
    });
    this.define('-', function(a, b) {
        return a - b;
    });
    this.define('*', function(a, b) {
        return a * b;
    });
    this.define('/', function(a, b) {
        return a / b;
    });
}

util.inherits(TopLevel, Scope);

Scope.TopLevel = TopLevel;
module.exports = Scope;
