var stream = require('readable-stream');

function Program(program) {
    this.program = program;
}

Program.prototype.invoke = function(args, scope) {
    var no = /^[0-9]+\s*$/,
        str = /^["'].*["']$/,
        input = new stream.PassThrough,
        output = new stream.PassThrough,
        streams = {
            input: input,
            output: output
        };

    args = args.map(function(arg){
        try {
            return scope.lookup(arg).value;
        } catch (e) {
            if (str.test(arg)) return arg.slice(1, -1);
            if (no.test(arg)) return parseInt(arg, 10);
            return arg;
        }
    });

    this.program.apply(streams, args);
    return streams;
}

module.exports = Program;
