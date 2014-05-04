function Program(program) {
    this.program = program;
}

Program.prototype.invoke = function(args, scope) {
    var no = /^[0-9]+$/,
        str = /^["'].*["']$/;

    args = args.map(function(arg){
        try {
            return scope.lookup(arg).value;
        } catch (e) {
            if (str.test(arg)) return arg.slice(1, -1);
            if (no.test(arg)) return parseInt(arg, 10);
            return arg;
        }
    });

    return this.program.apply(null, args);
}

module.exports = Program;
