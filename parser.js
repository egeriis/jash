var parser = require('./jash_spec').Parser,
    childProcess = require('child_process'),
    stream = require('readable-stream'),
    Scope = require('./scope'),
    util = require('util');

parser.Program = {
    eval: function(scope, input, output, cb) {
        var all = this.elements;

        var loop = function() {
            if ( ! all.length) return cb();
            all.shift().eval(scope, input, output, function(){
                loop();
            });
        };

        loop();
    }
};

parser.Cell = {
    eval: function(scope, input, output, cb) {
        return this.datum.eval(scope, input, output, cb);
        return function(cb) {
            var outputFunction = this.datum.eval(scope);
            if (typeof outputFunction == 'function') {
                return outputFunction(cb);
            }
            return cb();
        }.bind(this);
    }
};

parser.Token = {
};

parser.Comment = {
    eval: function(scope, input, output, cb) {
        cb();
    }
};

parser.FunctionCall = {
    eval: function(scope, input, output, cb) {
        var self = this;

        var done = function() {
            var program = scope.lookup(self.name.textValue, true),
                streams = program.invoke(args, scope);
            streams.output.pipe(output);
            streams.output.on('end', function(){
                cb();
            });
        }

        var args = [];
        var elem = this.args.elements.concat([]);
        var loop = function() {
            if (!elem.length) return done();
            var argObj = elem.shift();

            if (!argObj.arg.function_call) {
                args.push(argObj.arg.textValue);
                return loop();
            }

            var input = new stream.PassThrough,
                output = new stream.PassThrough,
                buf = [];

            argObj.arg.function_call.eval(scope, input, output, function(){
                args.push(buf.join(''));
                loop();
            });

            output.on('data', function(data) {
                buf.push(data);
            });
        };
        loop();
    }
};

parser.FunctionDef = {
    eval: function(scope, input, output, cb) {
        var args = this.args.elements.map(function(argObj){
                return argObj.name.textValue;
            }),
            program = this.name.textValue,
            lines = this.line.elements.concat([]);

        // The programs should receive the stream to which output should be sent—could potentially be defined in TopLevel scope
        scope.define(program, function(){
            if (arguments.length > args.length) {
                throw new Error("Too many arguments passed to program: " + program + " (" + arguments.length + ", expected " + args.length + ")");
            } else if (arguments.length < args.length) {
                var undef = args.slice(arguments.length);
                throw new Error("Undefined argument(s): " + undef.join(', ') + " for program: " + program);
            }

            var defined = {};
            args.forEach(function(name, idx){
                defined[name] = this[idx];
            }, arguments);

            scope = new Scope(scope);
            scope.set(defined);

            var self = this;
            var loop = function() {
                if ( ! lines.length) {
                    return self.output.end();
                }
                var streams = {
                    input: new stream.PassThrough,
                    output: new stream.PassThrough
                };

                streams.output.pipe(self.output, { end: false });

                lines.shift().fn.eval(scope, streams.input, streams.output, function(){
                    loop();
                });
                return;
            }
            loop();
        });

        cb();
    }
};

parser.InlineFnCall = {};

module.exports = parser;
