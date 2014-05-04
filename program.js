function Program(program) {
    this.program = program;
}

Program.prototype.invoke = function(args) {
    var no = /^[0-9]+$/;

    args = args.map(function(arg){
        if (no.test(arg)) return parseInt(arg, 10);
        return arg;
    });

    return this.program.apply(null, args);
}

module.exports = Program;
