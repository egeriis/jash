var parser = require('./jash_spec').Parser,
    childProcess = require('child_process'),
    Stream = require('stream'),
    util = require('util');

parser.Program = {
    eval: function(scope) {
        var all = this.elements;
        var loop = function() {
            if ( ! all.length) return;
            all.shift().eval(scope)(function(resp){
                resp && process.stdout.write(resp+"\n");
                loop();
                return;

                resp.pipe(process.stdout);
                resp.on('end', function(){
                    console.log('end');
                    loop();
                });
            });
        };


        loop();
    }
};

parser.Cell = {
    eval: function(scope) {
        return function(cb) {
            var outputFunction = this.datum.eval(scope);
            if (typeof outputFunction == 'function') {
                outputFunction(cb);
            }
            return cb();
        }.bind(this);
    }
};

parser.Token = {
};

parser.FunctionCall = {
    eval: function(scope) {
        var args = this.args.elements.map(function(argObj){
            return argObj.arg.textValue;
        });

        return function(cb) {
            var returnValue = scope.lookup(
                this.name.textValue
            ).invoke(args);
            cb(returnValue);
        }.bind(this);
    },
    stream: function(data) {

        return new StreamData(data);

        var s = new Stream;
        s.pipe = function(dest) {
            dest.write(data);
            s.emit('end');
        };
        return s;
    }
};

parser.FunctionDef = {
    eval: function(scope) {
        var args = this.args.elements.map(function(argObj){
                return argObj.name.textValue;
            }),
            program = this.name.textValue,
            lines = this.line.elements;

        // The programs should receive the stream to which output should be sent—could potentially be defined in TopLevel scope
        scope.define(program, function(){
            if (arguments.length > args.length) {
                throw new Error("Too many arguments passed to program: " + program + " (" + arguments.length + ", expected " + args.length + ")");
            } else if (arguments.length < args.length) {
                var undef = args.slice(arguments.length);
                throw new Error("Undefined argument(s): " + undef.join(', ') + " for program: " + program);
            }

            var resp = [];
            lines.forEach(function(line){
                line.fn.eval(scope)(function(a){
                    resp.push(a);
                });
            });
            return resp.join('\n');
        });
    }
};

module.exports = parser;
